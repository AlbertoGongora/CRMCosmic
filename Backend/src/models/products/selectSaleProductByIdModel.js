import { getDBPool } from '../../db/getPool.js';
import { databaseInsertError } from '../../services/error/errorDataBase.js';

export const selectSaleProductByIdModel = async (saleProduct_id) => {
  try {
    const pool = await getDBPool();

    const [rows] = await pool.query(
      'SELECT * FROM SalesProducts WHERE id_saleProduct = ?',
      [saleProduct_id]
    );
    return rows[0];
  } catch (error) {
    databaseInsertError(
      error.message ||
        'Error en el modelo al selecionar la venta del producto en la base de datos'
    );
  }
};
