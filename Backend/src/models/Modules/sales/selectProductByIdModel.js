import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectProductByIdModel = async (id_saleProduct) => {
  try {
    const pool = await getDBPool();
    const [rows] = await pool.query(
      'SELECT * FROM SalesProducts WHERE id_saleProduct = ?',
      [id_saleProduct]
    );

    if (!rows || rows.length === 0) {
      notFoundError('SalesProduct');
    }

    return rows[0];
  } catch (error) {
    databaseQueryError(error.message || 'Error al consultar el producto por ID en la base de datos');
  }
};
