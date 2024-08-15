import { getDBPool } from "../../../db/getPool.js";
import { notFoundError } from "../../../services/error/errorService.js";
import { databaseQueryError } from "../../../services/error/errorDataBase.js";

export const selectInvoiceIdBySaleIdModel = async (saleId) => {
  try {
    const pool = await getDBPool();
    const query = `SELECT id_invoice FROM Invoices WHERE sale_id = ?`;
    const [rows] = await pool.query(query, [saleId]);

    // Verificar si se encontró la factura
    if (!rows || rows.length === 0) {
      notFoundError('Factura no encontrada');
    }

    return rows[0];
  } catch (error) {
    databaseQueryError('Error al obtener el ID de la factura por ID de la venta');
  }
};
