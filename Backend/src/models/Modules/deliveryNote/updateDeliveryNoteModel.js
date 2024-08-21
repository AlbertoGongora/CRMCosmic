import { getDBPool } from "../../../db/getPool.js";
import { databaseUpdateError } from "../../../services/error/errorDataBase.js";


export const updateDeliveryNoteModel = async (
  deliveryNote_id,
  delivery_status
) => {
  try {
    const pool = await getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    // Añadir el campo y valor para actualizar
    addToUpdate('delivery_status', delivery_status);

    // Si no hay campos para actualizar, retornar un objeto vacío
    if (fieldsToUpdate.length === 0) return {};

    // Construir la consulta SQL de actualización
    const query = `UPDATE DeliveryNotes SET ${fieldsToUpdate.join(', ')} WHERE id_note = ?`;
    values.push(deliveryNote_id);

    // Ejecutar la consulta
    const [result] = await pool.query(query, values);

    // Verificar si la actualización afectó alguna fila
    if (result.affectedRows === 0) {
      databaseUpdateError('No se ha podido actualizar el estado de la nota de entrega');
    }

  } catch (error) {
    databaseUpdateError(error.message || 'Error al actualizar la nota de entrega');
  }
};
