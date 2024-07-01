import mysql from 'mysql2/promise';
import { dbConfig } from './config';

dbConfig.host = 'localhost';
dbConfig.port = 3306;
dbConfig.user = 'root';
dbConfig.password = '1234';
dbConfig.database = 'ordersyncdb';
const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  
});

export const getConnection = () => {
  return pool.getConnection();
};

export const executeQuery = async (query: string, values?: any[]) => {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

export const executeTransaction = async (queries: string[], values: any[][]) => {
  const connection = await getConnection();
  try {
    await connection.beginTransaction();
    for (let i = 0; i < queries.length; i++) {
      await connection.query(queries[i], values[i]);
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export const closeConnection = async () => {
  await pool.end();
}

    