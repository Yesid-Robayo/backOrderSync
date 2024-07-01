export const quearyOrders = {
    addOrders: 'INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)  VALUES (?, ?, ?,?,?,?)',
    getOrdersById: 'SELECT * FROM orders WHERE id = ?',
    updateOrders: 'UPDATE orders SET date = ?, status = ?, paid = ?, user_id = ?, shipping_rule = ?, comments = ? WHERE id = ?',
    deleteOrders: 'DELETE FROM orders WHERE id = ?',
    updateStatus: 'UPDATE orders SET status = ? WHERE id = ?',
    

}