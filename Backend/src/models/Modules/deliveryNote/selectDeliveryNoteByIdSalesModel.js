import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectDeliveryNoteByIdSalesModel = async (id_sale) => {
  try {
    const pool = await getDBPool();

    const [result] = await pool.query(
      'SELECT * FROM DeliveryNotes WHERE sale_id = ?',
      [id_sale]
    );

    return result[0];
  } catch (error) {
    databaseQueryError('Error al obtener la nota de entrega por ID de venta');
  }
};
