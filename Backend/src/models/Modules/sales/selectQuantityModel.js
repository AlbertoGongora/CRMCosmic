import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectQuantityModel = async (quantity, id_product) => {
  try {
    const pool = await getDBPool();

    const [result] = await pool.query(
      `SELECT * FROM SalesProducts WHERE quantity = ? AND product_id = ?`,
      [quantity, id_product]
    );

    if (!result || result.length === 0) {
      notFoundError('SalesProducts');
    }

    return result[0];
  } catch (error) {
    databaseQueryError(error.message || 'Error al consultar la cantidad de productos en la base de datos');
  }
};
