import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const insertPaymentModel = async (
  id_payment,
  ref,
  invoice_id,
  payment_date
) => {
  try {
    const pool = getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    addToUpdate('id_payment', id_payment);
    addToUpdate('ref_PM', ref);
    addToUpdate('invoice_id', invoice_id);
    addToUpdate('payment_date', payment_date);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    // Adaptar e query a los valores dados
    const fieldsString = fieldsToUpdate.join(', ');
    const query = `INSERT INTO Payments SET ${fieldsString}`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseQueryError('No se ha podido insertar el pago');
    }
  } catch (error) {
    databaseQueryError('Error en el modelo al insertar el pago');
  }
};
