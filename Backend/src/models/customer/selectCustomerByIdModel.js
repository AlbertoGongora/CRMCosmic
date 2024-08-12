import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectCustomerByIdModel = async (id_customer) => {
  try {
    const pool = await getDBPool();

    // Comprobar si existe un cliente con el id proporcionado.
    const [rows] = await pool.query(
      `SELECT * FROM Customers WHERE id_customer = ?`,
      [id_customer]
    );

    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al obtener el cliente por id'
    );
  }
};
