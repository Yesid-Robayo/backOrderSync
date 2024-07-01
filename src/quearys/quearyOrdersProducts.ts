export const quearyOrdersProducts = {
    addOrdersProducts: 'INSERT INTO orders_products (order_id, product_id, quantity)  VALUES (?, ?, ?)',
    getOrdersProductsByOrderIdAndOffset: 'SELECT * FROM orders_products WHERE order_id = ? LIMIT ?, OFFSET ?',
    deleteOrdersProducts: 'DELETE FROM orders_products WHERE order_id = ?',
    getOrderProductsByOrderId: 'SELECT * FROM order_products WHERE order_id = ?',
    

}