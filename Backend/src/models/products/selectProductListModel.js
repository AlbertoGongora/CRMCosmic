import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectProductListModel = async () => {
  try {
    const pool = getDBPool();

    // Obtener todos los productos
    const result = await pool.query(`
      SELECT id_product, ref_PR, name, description, price, stock, active, creation_at
      FROM Products
      ORDER BY ref_PR DESC
    `);

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al obtener la lista de productos desde el modelo'
    );
  }
};
