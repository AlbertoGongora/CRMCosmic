import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectInvoiceByIdModel = async (invoice_id) => {
  try {
    const pool = await getDBPool();

    const sql = `SELECT * FROM Invoices WHERE id_invoice = ?`;
    const [rows] = await pool.query(sql, [invoice_id]);

    return rows[0];
  } catch (error) {
    databaseQueryError('Error en el modelo al obtener el ID de la factura ');
  }
};
