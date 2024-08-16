import { getDBPool } from '../../../db/getPool.js';
import { databaseDeleteError } from '../../../services/error/errorDataBase.js';

export const selectModuleByIdInvoiceModel = async (invoiceId) => {
  try {
    const pool = await getDBPool();

    const modules = await pool.query(
      `SELECT * FROM Modules WHERE invoice_id = ?`,
      [invoiceId]
    );

    console.log(modules);

    return modules[0];
  } catch (error) {
    databaseDeleteError(
      error.message ||
        'Error en el modelo al seleccionar del módulo una factura de la base de datos'
    );
  }
};
