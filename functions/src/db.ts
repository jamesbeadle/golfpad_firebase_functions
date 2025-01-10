import * as sql from 'mssql';
import { defineString } from 'firebase-functions/params';

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
  user: `${defineString('SQL_USER')}`,
  password: `${defineString('SQL_PASSWORD')}`,
  server: `${defineString('SQL_HOST')}`,
  database: `${defineString('SQL_DBNAME')}`,
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
