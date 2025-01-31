import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectShipmentByIdShipmentModel = async (shipmentId) => {
  try {
    const pool = await getDBPool();
    const [rows] = await pool.query(
      'SELECT * FROM Shipments WHERE id_shipment = ?',
      [shipmentId]
    );
    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        'Error en el modelo al obtener el envio de la base de datos'
    );
  }
};
