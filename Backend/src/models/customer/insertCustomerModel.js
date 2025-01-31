import { getDBPool } from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const insertCustomerModel = async (
  id_customer,
  ref,
  name,
  last_name,
  email,
  phone,
  company_name,
  NIF,
  id_address
) => {
  try {
    // Crear un pool de conexiones.
    const pool = await getDBPool();

    // Insertamos el cliente en la base de datos.
    const [result] = await pool.query(
      `INSERT INTO Customers (id_customer, ref_CT, name, last_name, email, phone, company_name,
        NIF, address_id) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        id_customer,
        ref,
        name,
        last_name,
        email,
        phone,
        company_name,
        NIF,
        id_address,
      ]
    );

    // Verificar si el insert afectó a alguna línea.
    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido insertar el cliente.');
    }

    return { message: 'Cliente insertado correctamente' };
  } catch (error) {
    databaseInsertError(
      error.message || 'Error en el modelo al insertar cliente'
    );
  }
};
