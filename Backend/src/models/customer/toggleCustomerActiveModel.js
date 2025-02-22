import { getDBPool } from '../../db/getPool.js';
import { databaseUpdateError } from '../../services/error/errorDataBase.js';

export const toggleCustomerActiveModel = async (id_customer, newStatus) => {
  try {
    const pool = await getDBPool();
    const [result] = await pool.query(
      'UPDATE Customers SET active = ? WHERE id_customer = ?',
      [newStatus, id_customer]
    );
    if (result.affectedRows === 0) {
      const error = new Error('No se ha podido cambiar el estado del cliente');
      error.code = 'TOGGLE_CUSTOMER_ERROR';
      throw error;
    }
  } catch (error) {
    databaseUpdateError(
      error.message || 'Error en el modelo al cambiar el estado del cliente'
    );
  }
};
