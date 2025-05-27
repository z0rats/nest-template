import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'nestjs-template',
  entities: [join(__dirname, 'db/entities/**/*.{ts,js}')],
  migrations: [join(__dirname, 'db/migrations/**/*.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production',
  // logging: process.env.NODE_ENV !== 'production',
});
