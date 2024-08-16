import { getDBPool } from '../../../db/getPool.js';
import { databaseUpdateError } from '../../../services/error/errorDataBase.js';

export const statusUpdateInvoiceModel = async (invoiceId, invoice_status) => {
  try {
    const pool = await getDBPool();

    const result = await pool.query(
      'UPDATE Invoices SET invoice_status = ? WHERE id_invoice = ?',
      [invoice_status, invoiceId]
    );

    return result;
  } catch (error) {
    databaseUpdateError(
      'Error en el modelo al actualizar el estado de la factura en la base de datos'
    );
  }
};
