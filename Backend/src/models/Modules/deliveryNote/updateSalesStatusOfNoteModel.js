import { getDBPool } from "../../../db/getPool.js";
import { databaseUpdateError } from "../../../services/error/errorDataBase.js";


export const updateSalesStatusOfNoteModel = async (id_sale, operation_status) => {
  try {
    const pool = await getDBPool();

    // Actualizar el estado de la operación en la venta
    const [result] = await pool.query(
      'UPDATE Sales SET operation_status = ? WHERE id_sale = ?',
      [operation_status, id_sale]
    );

    // Verificar si la actualización afectó alguna fila
    if (result.affectedRows === 0) {
      databaseUpdateError('No se pudo actualizar el estado de la venta.');
    }

    return { message: 'Estado de la venta actualizado correctamente' };
  } catch (error) {
    // Manejar errores en la consulta
    databaseUpdateError(error.message || 'Error al actualizar el estado de la venta en el modelo');
  }
};
