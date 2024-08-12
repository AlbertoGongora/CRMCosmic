import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectCustomerByEmailModel = async (email) => {
  try {
    const pool = await getDBPool();

    // Obtener el cliente  con ese email.
    const [customer] = await pool.query(
      `SELECT * FROM Customers WHERE email = ?`,
      [email]
    );

    return customer[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al seleccionar cliente por email'
    );
  }
};
