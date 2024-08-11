import mysql from 'mysql2/promise';

import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
} from '../../env.js';
import { databaseConnectionError } from '../services/error/errorDataBase.js';

let pool;

export function getDBPool() {
  if (!pool) {
    try {
      pool = mysql.createPool({
        database: MYSQL_DATABASE,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        port: MYSQL_PORT,
      });
    } catch (error) {
      throw databaseConnectionError('No se ha podido conectar con la base de datos');
    }
  }
  return pool;
}
