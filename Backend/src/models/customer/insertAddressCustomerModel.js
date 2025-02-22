import { getDBPool } from '../../db/getPool.js';
import { databaseInsertError } from '../../services/error/errorDataBase.js';

export const insertAddressCustomerModel = async (
  id_address,
  address,
  number,
  floor,
  letter_number,
  city,
  zip_code,
  country
) => {
  try {
    const pool = await getDBPool();

    const result = await pool.query(
      `INSERT INTO Addresses (id_address, address, number, floor, letter_number, city, zip_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_address,
        address,
        number,
        floor,
        letter_number,
        city,
        zip_code,
        country,
      ]
    );

    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido insertar la dirección');
    }
  } catch (error) {
    databaseInsertError(
      error.message || 'Error en el modelo al insertar dirección del cliente'
    );
  }
};
