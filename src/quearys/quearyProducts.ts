export const quearysProducts = {
    getProduct: 'SELECT * FROM products',
    getProductsByIds: 'SELECT * FROM products WHERE id IN (?)',
    getProductByOffset: 'SELECT * FROM products LIMIT ?, OFFSET ?',
    addProduct: 'INSERT INTO products (name, price, inventory) VALUES (?, ?, ?)',
    getProductById: 'SELECT * FROM products WHERE id = ?',
    updateProduct: 'UPDATE products SET name = ?, price = ?, inventory = ? WHERE id = ?',
    deleteProduct: 'DELETE FROM products WHERE id = ?',
    getInventory: 'SELECT inventory FROM products WHERE id = ?',


}