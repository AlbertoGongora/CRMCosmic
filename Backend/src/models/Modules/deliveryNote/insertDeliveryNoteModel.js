import { getDBPool } from '../../../db/getPool.js';
import { databaseInsertError } from '../../../services/error/errorDataBase.js';

export const insertDeliveryNoteModel = async (
  id_note,
  sale_id,
  ref_DN,
  deliverer_id,
  address_id,
  customer_id,
  saleProduct_id
) => {
  try {
    const pool = await getDBPool();

    // Insertar la nota de entrega en la base de datos
    const insertQuery = `
      INSERT INTO DeliveryNotes (id_note, ref_DN, sale_id, deliverer_id, address_id, customer_id, saleProduct_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [insertResult] = await pool.query(insertQuery, [
      id_note,
      ref_DN,
      sale_id,
      deliverer_id,
      address_id,
      customer_id,
      saleProduct_id
    ]);

    // Verificar si la inserción fue exitosa
    if (insertResult.affectedRows === 0) {
      databaseInsertError('No se pudo insertar la nota de entrega');
    }

  } catch (error) {
    // Manejar errores en la consulta
    databaseInsertError(error.message || 'Error al insertar la nota de entrega en el modelo');
  }
};
