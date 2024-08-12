import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectProductSearchModel = async (search) => {
  try {
    const pool = getDBPool();

    const [rows] = await pool.query(
      'SELECT * FROM Products WHERE name LIKE? OR ref_PR LIKE?',
      [`%${search}%`, `%${search}`]
    );

    return rows;
  } catch (error) {
    databaseQueryError(
      error.message ||
        'Error al obtener la lista de busquedas de productos desde el modelo'
    );
  }
};
