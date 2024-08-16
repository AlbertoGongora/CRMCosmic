import { getDBPool } from '../../../db/getPool.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const selectInvoiceById = async (invoiceId) => {
  try {
    const pool = await getDBPool();

    const [rows] = await pool.query(
      'SELECT * FROM Invoices WHERE id_invoice = ?',
      [invoiceId]
    );

    return rows[0];
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_SALES_SERVICE_ERROR',
      'Error en el modelo al selecionar una factura'
    );
  }
};
