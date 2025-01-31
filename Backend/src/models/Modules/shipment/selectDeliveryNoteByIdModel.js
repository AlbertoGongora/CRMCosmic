import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectDeliveryNoteByIdModel = async (deliveryNote_id) => {
  try {
    const pool = await getDBPool();

    const [rows] = await pool.query(
      'SELECT * FROM DeliveryNotes WHERE id_note = ?',
      [deliveryNote_id]
    );
    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        'Error en el modelo al seleccionar el albaran de un  envio de la base de datos'
    );
  }
};
