import { getDBPool } from '../../../db/getPool.js';
import { databaseInsertError } from '../../../services/error/errorDataBase.js';

export const selectCustomerIdBySaleIdModel = async (saleId) => {
  try {
    const pool = getDBPool();

    const query = `SELECT * FROM Sales WHERE id_sale = ?`;

    const [sale] = await pool.query(query, [saleId]);

    return sale[0];
  } catch (error) {
    databaseInsertError(
      error.message ||
        'Error en el modelo al selecionar el cliente para la factura en la base de datos'
    );
  }
};
