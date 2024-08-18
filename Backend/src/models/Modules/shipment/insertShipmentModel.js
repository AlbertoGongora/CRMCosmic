import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const insertShipmentModel = async ({
  shipmentId,
  ref,
  customer_id,
  address_id,
  deliveryNote_id,
  additional_notes,
}) => {
  try {
    const pool = getDBPool();

    const [result] = await pool.query(
      'INSERT INTO Shipments (id_shipment, ref_SH, customer_id, address_id, deliveryNote_id, additional_notes) VALUES (?, ?, ?, ?, ?, ?)',
      [
        shipmentId,
        ref,
        customer_id,
        address_id,
        deliveryNote_id,
        additional_notes,
      ]
    );
    return result;
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al insertar el envio'
    );
  }
};
