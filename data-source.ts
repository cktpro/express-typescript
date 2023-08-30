require('dotenv').config();
import 'reflect-metadata';

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: '170.187.227.183',
  port: 1433,
  username: 'sa',
  password: 'Tram250399',
  database: 'OnlineShop',
  entities: ['entities/**/*.entity{.ts,.js}', 'entities/**/*.schema{.ts,.js}'],
  synchronize: false,
  logging: false,
  options: {
    encrypt: false,
  },
});
