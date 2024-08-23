import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectProductModel = async (product) => {
  try {
    const pool = getDBPool();

    const [result] = await pool.query(
      `SELECT * FROM Products WHERE id_product = ?`,
      [product]
    );

    // Verificar si se encontró el producto
    if (!result || result.length === 0) {
      notFoundError('Products');
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al consultar el producto en la base de datos'
    );
  }
};
