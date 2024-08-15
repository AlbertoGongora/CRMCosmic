import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectShipmentByIdNoteModel = async (id) => {
  try {
    const pool = await getDBPool();

    const [rows] = await pool.query(
      'SELECT * FROM `Shipments` WHERE `deliveryNote_id` = ?',
      [id]
    );

    // Verificar si se encontró un envío
    if (!rows || rows.length === 0) {
      notFoundError('Envío no encontrado');
    }

    return rows[0];
  } catch (error) {
    databaseQueryError('Error al obtener el envío por ID de nota de entrega');
  }
};
