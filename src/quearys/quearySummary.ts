
export const quearySummary = {
    getNumberOfOrders: `
    SELECT 
    COUNT(*) as ordenes 
FROM 
    orders 
WHERE 
    date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);
`,
    getNumberOfOrdersRange: 'SELECT COUNT(*) as orders FROM orders WHERE date BETWEEN ? AND ?',
    getNumberOfCustomers: 'SELECT COUNT(*) as users FROM users',
    revenueFromTheLastMonth: `SELECT SUM(p.price * op.quantity) AS revenue_last_month FROM orders o JOIN order_products op ON o.id = op.order_id JOIN  products p ON op.product_id = p.id WHERE  DATE_FORMAT(o.date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE - INTERVAL 1 MONTH, '%Y-%m');`,
    revenueDateAndCountOrders: `SELECT 
    date,
    COUNT(*) as order_count
FROM 
    orders
WHERE 
    date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY 
    date
ORDER BY 
    date ASC;`,
    citywithMostOrders: `SELECT 
    u.city, 
    COUNT(*) AS orders,
    (SELECT COUNT(*) FROM orders) AS total_orders
FROM 
    orders o 
JOIN 
    users u ON o.user_id = u.id 
GROUP BY 
    u.city 
ORDER BY 
    orders DESC 
LIMIT 1;
`,
    bestSellingProduct: 'SELECT p.name, SUM(op.quantity) AS total_sold FROM order_products op JOIN products p ON op.product_id = p.id GROUP BY p.name ORDER BY total_sold DESC LIMIT 1',
}