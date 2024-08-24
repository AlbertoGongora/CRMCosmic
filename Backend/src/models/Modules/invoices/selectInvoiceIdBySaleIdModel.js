import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectInvoiceIdBySaleIdModel = async (sale_id) => {
  try {
    const pool = await getDBPool();

    const query = `SELECT id_invoice FROM Invoices WHERE sale_id = ?`;

    const [rows] = await pool.query(query, [sale_id]);

    return rows[0];
  } catch (error) {
    databaseQueryError('Error en el modelo al obtener el ID de la factura ');
  }
};
