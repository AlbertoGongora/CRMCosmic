import { getDBPool } from '../../../db/getPool.js';
import { databaseDeleteError } from '../../../services/error/errorDataBase.js';

export const deleteShipmentModel = async (shipmentId) => {
  try {
    const pool = await getDBPool();

    const [result] = await pool.query(
      'DELETE FROM Shipments WHERE id_shipment = ?',
      [shipmentId]
    );
    if (result.affectedRows === 0) {
      databaseDeleteError('No se ha podido eliminar el envio');
    }
    return { message: 'Envio eliminado correctamente' };
  } catch (error) {
    databaseDeleteError(
      error.message || 'Error en el modelo al eliminiar el envio'
    );
  }
};
