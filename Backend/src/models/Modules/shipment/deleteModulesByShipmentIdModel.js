import { getDBPool } from '../../../db/getPool.js';
import { databaseDeleteError } from '../../../services/error/errorDataBase.js';

export const updateModulesByShipmentIdModel = async (shipmentId) => {
  try {
    const pool = await getDBPool();
    const [result] = await pool.query(
      'UPDATE Modules SET shipment_id = NULL WHERE shipment_id = ?',
      [shipmentId]
    );
    return result;
  } catch (error) {
    databaseDeleteError(
      error.message || 'Error en el modelo al actualizar el envio en el modulo '
    );
  }
};
