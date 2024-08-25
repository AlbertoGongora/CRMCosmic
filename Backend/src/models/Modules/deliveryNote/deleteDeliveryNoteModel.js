import { getDBPool } from '../../../db/getPool.js';
import {
  databaseDeleteError,
  databaseUpdateError,
} from '../../../services/error/errorDataBase.js';

export const deleteDeliveryNoteModel = async (deliveryNote_id) => {
  try {
    const pool = await getDBPool();

    // Establecer el campo deliveryNote_id a NULL en la tabla Modules
    const [updateResult] = await pool.query(
      'UPDATE Modules SET deliveryNote_id = NULL WHERE deliveryNote_id = ?',
      [deliveryNote_id]
    );

    // Verificar si la actualización afectó alguna fila
    if (updateResult.affectedRows === 0) {
      databaseUpdateError(
        'No se pudo actualizar el módulo al eliminar el delivery note'
      );
    }

    // Eliminar el registro de la tabla DeliveryNotes
    const [deleteResult] = await pool.query(
      'DELETE FROM DeliveryNotes WHERE id_note = ?',
      [deliveryNote_id]
    );

    // Verificar si la eliminación afectó alguna fila
    if (deleteResult.affectedRows === 0) {
      databaseDeleteError('No se ha podido eliminar el albarán');
    }

    return { message: 'Albarán eliminado correctamente' };
  } catch (error) {
    databaseDeleteError(
      error.message || 'Error al eliminar el albarán',
      'Error al eliminar el albarán'
    );
  }
};
