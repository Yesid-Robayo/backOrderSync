export const quearysUser = {
    getUsersByOffset: 'SELECT * FROM users LIMIT ?, OFFSET ?',
    getAllUsers: 'SELECT * FROM users',
    adduser: 'INSERT INTO users (name, phone, email, address, city)  VALUES (?, ?, ?, ?,?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    updateUser: 'UPDATE users SET name = ?, phone = ?, email = ?, address = ?, city = ? WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?',
    getCitys: 'SELECT city FROM users',
    
}