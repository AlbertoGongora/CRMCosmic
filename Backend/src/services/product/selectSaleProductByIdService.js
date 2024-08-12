import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../error/errorDataBase.js';

export const selectSaleProductByIdService = async (productId) => {
  try {
    const pool = await getDBPool();

    const [result] = await pool.query(
      `SELECT * FROM Products
          WHERE id_product = ?;
          `,
      [productId]
    );

    if (result.affectedRows === 0) {
      const error = new Error('No se ha podido encontrar el producto.');
      error.code = 'SELECT_PRODUCTS_ERROR';
      throw error;
    }
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al obtener el producto por id'
    );
  }
};
