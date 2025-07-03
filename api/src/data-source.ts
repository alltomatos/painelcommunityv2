import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const rootDir = path.resolve(__dirname);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [path.join(rootDir, '/modules/**/*.entity.{ts,js}')],
  migrations: [path.join(rootDir, '/migrations/*.{ts,js}')],
  synchronize: false,
}); 