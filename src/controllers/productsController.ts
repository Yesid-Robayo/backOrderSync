import { Request, Response } from "express";
import { executeQuery, executeTransaction } from "../config/dbConnection";
import { quearysProducts } from "../quearys/quearyProducts";

export const addProducts = async (req: Request, res: Response) => {
    const { name, price, stock } = req.body;
    try {
        await executeQuery(quearysProducts.addProduct, [name, price, stock]);
        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' });
    }
}

export const getProductsByOffSet = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    try {
        const products = await executeQuery(quearysProducts.getProductByOffset, [parseInt(limit as string), parseInt(offset as string)]);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products' });
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await executeQuery(quearysProducts.getProduct);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products' });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    try {
        await executeQuery(quearysProducts.updateProduct, [name, price, stock, id]);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await executeQuery(quearysProducts.deleteProduct, [id]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await executeQuery(quearysProducts.getProductById, [id]);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product' });
    }
}
