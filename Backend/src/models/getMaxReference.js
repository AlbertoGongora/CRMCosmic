import { getDBPool } from '../db/getPool.js';
import { databaseQueryError } from '../services/error/errorDataBase.js';

export const getMaxReference3Digits = async (tableName, refField) => {
  try {
    const pool = await getDBPool();
    const query = `SELECT ${refField} FROM ${tableName} ORDER BY ${refField} DESC LIMIT 1`;
    const [result] = await pool.query(query);
    
    // Si no se encuentra ninguna referencia, devolver null
    return result.length > 0 ? result[0][refField] : null;
  } catch (error) {
    databaseQueryError(error.message || 'Error al obtener la referencia máxima de 3 dígitos en la base de datos');
  }
};

export const getMaxReference5Digits = async (tableName, refField) => {
  try {
    const pool = await getDBPool();
    const query = `SELECT ${refField} FROM ${tableName} ORDER BY ${refField} DESC LIMIT 1`;
    const [result] = await pool.query(query);
    
    // Si no se encuentra ninguna referencia, devolver null
    return result.length > 0 ? result[0][refField] : null;
  } catch (error) {
    databaseQueryError(error.message || 'Error al obtener la referencia máxima de 5 dígitos en la base de datos');
  }
};
