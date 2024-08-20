import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectCustomersListModel = async () => {
  try {
    const pool = await getDBPool();

    // Obtener todos los clientes junto con sus direcciones.
    const query = `SELECT Customers.id_customer, Customers.ref_CT, Customers.name,  Customers.last_name,Customers.email, Customers.phone, Customers.company_name, Customers.NIF, Customers.active, Addresses.address, Addresses.number, Addresses.floor, Addresses.letter_number, Addresses.city, Addresses.zip_code, Addresses.country
      FROM Customers
      JOIN Addresses ON Customers.address_id = Addresses.id_address
      ORDER BY Customers.ref_CT DESC
    `;

    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al obtener la lista de clientes desde el modelo'
    );
  }
};
