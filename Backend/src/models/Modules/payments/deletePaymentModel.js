import { getDBPool } from '../../../db/getPool.js';
import { databaseDeleteError } from '../../../services/error/errorDataBase.js';

export const deletePaymentModel = async (paymentsId) => {
  try {
    const pool = await getDBPool();

    // elimino del las tablas todos los pagos relacionados
    await pool.query('DELETE FROM Modules WHERE payment_id = ? ', [paymentsId]);

    const [result] = await pool.query(
      'DELETE FROM Payments WHERE id_payment = ?',
      [paymentsId]
    );

    if (result.affectedRows === 0) {
      databaseDeleteError('No se ha podido eliminar el pago');
    }

    return { message: 'Pago eliminado correctamente' };
  } catch (error) {
    databaseDeleteError(
      error.message || 'Error en el modelo al eliminar el pago',
      'Error en el modelo al eliminar el pago'
    );
  }
};
