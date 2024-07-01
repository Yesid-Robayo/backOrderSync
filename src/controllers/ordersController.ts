import { Request, Response } from "express";
import { executeQuery, executeTransaction } from "../config/dbConnection";
import { quearyOrders } from "../quearys/quearyOrders";
import { quearyOrdersProducts } from "../quearys/quearyOrdersProducts";
import { quearysProducts } from "../quearys/quearyProducts";

export const getOrdersWhithFilters = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search = '', status = '', shipping_rule = '' } = req.query;
    try {

        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

        let whereClause = 'WHERE 1=1';
        if (search) {
            whereClause += ` AND (id LIKE '%${search}%' OR comments LIKE '%${search}%')`;
        }
        if (status) {
            whereClause += ` AND status = '${status}'`;
        }
        if (shipping_rule) {
            whereClause += ` AND shipping_rule = '${shipping_rule}'`;
        }

        const ordersQuery = `SELECT * FROM orders ${whereClause} LIMIT ? OFFSET ?`;
        const countQuery = `SELECT COUNT(*) as count FROM orders ${whereClause}`;

        const orders = await executeQuery(ordersQuery, [parseInt(limit.toString()), parseInt(offset.toString())]);
        const countResult: any = await executeQuery(countQuery);
        const totalOrders = countResult[0].count;

        res.status(200).json({ orders, totalOrders });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders' });
    }
}

export const addOrdersWithProducts = async (req: Request, res: Response) => {
    const { date, status, paid, user_id, shipping_rule, comments, products } = req.body;

    const queries: string[] = [];
    const values: any[][] = [];

    try {
        // First, check inventory for all products
        for (const product of products) {
            const [inventoryResult] = await executeQuery(quearysProducts.getInventory,
                [product.id]
            ) as any[];
            if (!inventoryResult || inventoryResult.length === 0) {
                throw new Error(`Product with id ${product.id} not found`);
            }

            const currentInventory = inventoryResult.inventory;
            if (currentInventory < product.quantity) {
                throw new Error(`Insufficient inventory for product ${product.id}`);
            }
        }

        // Add order
        queries.push(quearyOrders.addOrders);
        values.push([date, status, paid, user_id, shipping_rule, comments]);

        // Prepare queries for adding order products and updating inventory
        for (const product of products) {
            queries.push('INSERT INTO order_products (order_id, product_id, quantity) VALUES (LAST_INSERT_ID(), ?, ?)');
            values.push([product.id, product.quantity]);

            queries.push('UPDATE products SET inventory = inventory - ? WHERE id = ?');
            values.push([product.quantity, product.id]);
        }

        // Execute all queries in a transaction
        await executeTransaction(queries, values);

        res.status(201).json({ message: 'Order added successfully' });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.message || 'Error adding order' });
    }
}
export const updateStatusOrder = async (req: Request, res: Response) => {

    const { id, status } = req.body;
    try {
        await executeQuery(quearyOrders.updateStatus, [status, id]);
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating order status' });
    }

}
export const deleteOrdersWithProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await executeTransaction([quearyOrdersProducts.deleteOrdersProducts, quearyOrders.deleteOrders], [[id], [id]]);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order' });
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, status, paid, user_id, shipping_rule, comments } = req.body;
    try {
        await executeQuery(quearyOrders.updateOrders, [date, status, paid, user_id, shipping_rule, comments, id]);
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order' });
    }
}
export const getOrderProductsByOrderId = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const orderProducts: any = await executeQuery(quearyOrdersProducts.getOrderProductsByOrderId, [id]);
        const products: any = await executeQuery(quearysProducts.getProductsByIds, [orderProducts.map((op: any) => op.product_id)]);
        res.status(200).json(orderProducts.map((op: any) => {
            const product = products.find((p: any) => p.id === op.product_id);
            return { ...op, product };
        })

        );
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order products' });
    }
}


