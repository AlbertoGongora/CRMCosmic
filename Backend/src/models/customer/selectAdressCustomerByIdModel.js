import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectAddressCustomerByIdModel = async (address_id) => {
  try {
    const pool = getDBPool();
    const [Addresses] = await pool.query(
      `SELECT * FROM Addresses WHERE id_address = ?`,
      [address_id]
    );

    return Addresses[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al obtener la dirección del cliente'
    );
  }
};
