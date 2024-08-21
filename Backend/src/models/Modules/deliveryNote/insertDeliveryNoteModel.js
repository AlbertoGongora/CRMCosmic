import { getDBPool } from '../../../db/getPool.js';
import { databaseInsertError, databaseQueryError } from '../../../services/error/errorDataBase.js';
import { notFoundError } from '../../../services/error/errorService.js';

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

    // Consultar la nota de entrega insertada
    const selectQuery = `
      SELECT * FROM DeliveryNotes WHERE id_note = ?
    `;

    const [rows] = await pool.query(selectQuery, [id_note]);

    // Verificar si se encontró la nota de entrega
    if (!rows || rows.length === 0) {
      notFoundError('Nota de entrega');
    }

    return rows[0]; // Devolver el primer (y único) registro del resultado de la consulta
  } catch (error) {
    // Manejar errores en la consulta
    databaseQueryError(error.message || 'Error al insertar la nota de entrega en el modelo');
  }
};
