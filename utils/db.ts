import mysql from 'mysql2/promise';
import 'dotenv/config';


export class Database {
  private static pool: mysql.Pool | null = null;
  
  private static dbUserName = process.env.DB_USER_NAME;
  private static dbPassword = process.env.DB_PASSWORD;
  private static dbHost = process.env.DB_HOST;
  private static dbPort = process.env.DB_PORT;
  private static dbName = process.env.DB_NAME;


  public static async getPool(): Promise<mysql.Pool> {
    if (!this.pool) {
      console.log('info', 'Creating database connection pool...');
      
      try {
        this.pool = mysql.createPool({
          host: this.dbHost,
          port: parseInt(this.dbPort || '3306'),
          user: this.dbUserName,
          password: this.dbPassword,
          database: this.dbName,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
        });
        console.log('info', `Database connection pool created successfully for ${this.dbName} on ${this.dbHost}`);
      } catch (error) {
        throw error;
      }
    }
    return this.pool;
  }
  
  

    public static async getResultSet(query: string): Promise<any[]> {
    const pool = await this.getPool();
    
    try {
      console.log('info', `Executing query: ${query}`);
      const [rows] = await pool.execute(query);
      return rows as any[];
    } catch (error) {
      console.log('error', `Error executing query: ${query}`, error);
      throw error;
    }
  }

  public static async runQuery(query: string): Promise<void> {
    const pool = await this.getPool();
    
    try {
      console.log('info', `Executing update query: ${query}`);
      await pool.execute(query);
      console.log('info', 'Query executed successfully');
    } catch (error) {
      console.log('error', `Error executing update query: ${query}`, error);
      throw error;
    }
  }
}
