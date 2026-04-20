import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'school_management',
};

export async function query(sql: string, params: any[] = []) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute(sql, params);
    await connection.end();
    return results;
  } catch (error) {
    console.warn('Database connection failed, falling back to mock data.', error);
    // Return empty array or handle mock logic downstream
    return null; 
  }
}
