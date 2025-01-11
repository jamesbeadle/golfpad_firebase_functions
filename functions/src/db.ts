import * as sql from 'mssql';

export interface DBConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  port?: number;
  options?: {
    encrypt?: boolean;
    trustServerCertificate?: boolean;
  };
}

const dbConfig: DBConfig = {
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASS ?? "",
  server: process.env.INSTANCE_HOST ?? "",
  database: process.env.DB_NAME ?? "",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

let pool: sql.ConnectionPool | undefined;

export async function getPool(): Promise<sql.ConnectionPool> {
    
  if (!pool) {
    pool = await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
  }
  return pool;
}
