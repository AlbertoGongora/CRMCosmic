import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const insertIdShipmentInModulesByIdNoteModel = async (
  idNote,
  idShipment
) => {
  try {
    const pool = await getDBPool();
    const query = `UPDATE Modules SET shipment_id = ? WHERE deliveryNote_id = ?`;
    const [result] = await pool.query(query, [idShipment, idNote]);
    return result;
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al insertar el envio en modulos'
    );
  }
};
