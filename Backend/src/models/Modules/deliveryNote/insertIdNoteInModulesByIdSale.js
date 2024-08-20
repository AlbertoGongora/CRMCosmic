import { getDBPool } from "../../../db/getPool.js";
import { databaseUpdateError } from "../../../services/error/errorDataBase.js";

export const insertIdNoteInModulesByIdSaleModel = async (idSale, idNote) => {
  try {
    const pool = await getDBPool();
    const query = `UPDATE Modules SET deliveryNote_id = ? WHERE sale_id = ?`;

    const [result] = await pool.query(query, [idNote, idSale]);

    // Verificar si la actualización afectó alguna fila
    if (result.affectedRows === 0) {
      databaseUpdateError('No se pudo insertar el ID de la nota de entrega en el módulo');
    }

    return result;
  } catch (error) {
    databaseUpdateError(error.message || 'Error al actualizar el módulo con el ID de la nota de entrega');
  }
};
