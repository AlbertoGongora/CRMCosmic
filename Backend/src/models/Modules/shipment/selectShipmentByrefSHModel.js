import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectShipmentByrefSHModel = async (ref_SH) => {
  try {
    const pool = await getDBPool();
    const [result] = await pool.query(
      'SELECT id_shipment FROM Shipments WHERE ref_SH = ?',
      [ref_SH]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al obtener la referenciade envio desde el modelo'
    );
  }
};
