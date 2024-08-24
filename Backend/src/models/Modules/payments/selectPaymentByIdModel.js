import { getDBPool } from '../../../db/getPool.js';
import { databaseDeleteError } from '../../../services/error/errorDataBase.js';

export const selectPaymentByIdModel = async (paymentsId) => {
  try {
    const pool = await getDBPool();

    const [payment] = await pool.query(
      `SELECT * FROM Payments WHERE id_payment = ?`,
      [paymentsId]
    );

    return payment[0];
  } catch (error) {
    databaseDeleteError(
      error.message || 'Error en el modelo al obtener el id del pago'
    );
  }
};
