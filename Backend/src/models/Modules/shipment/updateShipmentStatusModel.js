import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const updateShipmentStatusModel = async (shipmentId, newStatus) => {
  try {
    const pool = await getDBPool();
    await pool.query(
      'UPDATE Shipments SET shipment_status = ?, update_at = CURRENT_TIMESTAMP WHERE id_shipment = ?',
      [newStatus, shipmentId]
    );
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al actualizar el estado del envio'
    );
  }
};
