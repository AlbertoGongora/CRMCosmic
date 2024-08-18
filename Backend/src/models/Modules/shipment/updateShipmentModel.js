import { getDBPool } from '../../../db/getPool.js';
import { databaseInsertError } from '../../../services/error/errorDataBase.js';

export const updateShipmentModel = async (shipmentId, shipment_status) => {
  try {
    const pool = await getDBPool();

    const query = `UPDATE Shipments SET shipment_status = ? WHERE id_shipment = ?`;
    const values = [shipment_status, shipmentId];

    const [result] = await pool.query(query, values);

    // Si no se ha actualizado ningún envío, lanzar un error.
    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido actualizar el envío');
    }

    // Devolver el resultado.
    return { message: 'Envío actualizado correctamente' };
  } catch (error) {
    databaseInsertError(
      error.message || 'Error en el modelo al actualizar el envio '
    );
  }
};
