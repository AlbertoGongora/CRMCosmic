import { getDBPool } from '../../../db/getPool.js';
import { databaseInsertError } from '../../../services/error/errorDataBase.js';
import { notFoundError } from '../../../services/error/errorService.js';

export const changePaymentStatusModel = async (id_payment, status) => {
  try {
    const pool = await getDBPool();

    // Existe el pago?
    const [rows] = await pool.query(
      'SELECT * FROM Payments WHERE id_payment= ?',
      [id_payment]
    );
    console.log(rows);
    if (rows.length === 0) throw notFoundError('Payment');

    // Actualizar el pago
    const [result] = await pool.query(
      `UPDATE Payments SET payment_status = ? WHERE id_payment = ?`,
      [status, id_payment]
    );

    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido actualizar el pago.');
    }
  } catch (error) {
    databaseInsertError(
      error.message ||
        'Error en el modelo al cambiar el estado del pago en la base de datos'
    );
  }
};
