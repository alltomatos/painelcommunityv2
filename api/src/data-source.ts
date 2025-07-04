import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const rootDir = path.resolve(__dirname);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [path.join(rootDir, '/modules/**/*.entity.{ts,js}')],
  migrations: [path.join(rootDir, '/migrations/*.{ts,js}')],
  synchronize: false,
}); 