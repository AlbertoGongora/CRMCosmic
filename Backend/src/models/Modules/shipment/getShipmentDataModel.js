import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const getShipmentDataModel = async (id) => {
  try {
    const pool = await getDBPool();
    const [result] = await pool.query(
      `SELECT * FROM Shipments WHERE id_shipment = ?`,
      [id]
    );
    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al seleccionar la venta'
    );
  }
};
