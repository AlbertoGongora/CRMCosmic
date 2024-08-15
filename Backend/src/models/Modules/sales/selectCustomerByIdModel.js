import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectCustomerByIdModel = async (id_customer) => {
  try {
    const pool = await getDBPool();

    // Comprobar si existe un cliente con el id proporcionado.
    const [customer] = await pool.query(
      `SELECT * FROM Customers WHERE id_customer = ?`,
      [id_customer]
    );

    // Verificar si se encontró el cliente.
    if (!customer || customer.length === 0) {
      notFoundError('Customer');
    }

    return customer[0];
  } catch (error) {
    databaseQueryError(error.message || 'Error al consultar el cliente por ID en la base de datos');
  }
};
