import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectShipmentByIdModel = async (shipmentId) => {
  try {
    const pool = await getDBPool();
  
    // Comprobar si existe un envio con el id proporcionado.
    const [shipment] = await pool.query(
      `SELECT * FROM Shipments WHERE id_shipment = ?`,
      [shipmentId]
    );

    if (shipment.length === 0) {
      return null;
    }
  
    return shipment[0];    
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al seleccionar el envio.'
    );
  }
};
