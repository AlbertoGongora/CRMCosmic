import { getDBPool } from '../../db/getPool.js';
import { databaseInsertError } from '../../services/error/errorDataBase.js';

export const updateCustomerModel = async (
  customerId,
  name,
  last_name,
  email,
  phone,
  company_name,
  NIF,
  address,
  number,
  city,
  zip_code,
  country
) => {
  try {
    const pool = await getDBPool();

    const customerFieldsToUpdate = [];
    const addressFieldsToUpdate = [];
    const customerValues = [];
    const addressValues = [];

    const addToUpdate = (field, value, targetArray, valuesArray) => {
      if (value !== undefined && value !== null) {
        targetArray.push(`${field} = ?`);
        valuesArray.push(value);
      }
    };

    // Añadir campos
    addToUpdate('name', name, customerFieldsToUpdate, customerValues);
    addToUpdate('last_name', last_name, customerFieldsToUpdate, customerValues);
    addToUpdate('email', email, customerFieldsToUpdate, customerValues);
    addToUpdate('phone', phone, customerFieldsToUpdate, customerValues);
    addToUpdate(
      'company_name',
      company_name,
      customerFieldsToUpdate,
      customerValues
    );
    addToUpdate('NIF', NIF, customerFieldsToUpdate, customerValues);

    addToUpdate('address', address, addressFieldsToUpdate, addressValues);
    addToUpdate('number', number, addressFieldsToUpdate, addressValues);
    addToUpdate('city', city, addressFieldsToUpdate, addressValues);
    addToUpdate('zip_code', zip_code, addressFieldsToUpdate, addressValues);
    addToUpdate('country', country, addressFieldsToUpdate, addressValues);

    if (
      customerFieldsToUpdate.length === 0 &&
      addressFieldsToUpdate.length === 0
    )
      return {};

    // Update de cliente
    if (customerFieldsToUpdate.length > 0) {
      const customerQuery = `UPDATE Customers SET ${customerFieldsToUpdate.join(', ')} WHERE id_customer = ?`;
      customerValues.push(customerId);
      const [customerResult] = await pool.query(customerQuery, customerValues);

      if (customerResult.affectedRows === 0) {
        databaseInsertError('No se ha podido actualizar el cliente');
      }
    }

    // Update de direcciones
    if (addressFieldsToUpdate.length > 0) {
      const addressIdQuery = `SELECT address_id FROM Customers WHERE id_customer = ?`;
      const [addressIdResult] = await pool.query(addressIdQuery, [customerId]);
      const addressId = addressIdResult[0].address_id;

      const addressQuery = `UPDATE Addresses SET ${addressFieldsToUpdate.join(', ')} WHERE id_address = ?`;
      addressValues.push(addressId);
      const [addressResult] = await pool.query(addressQuery, addressValues);

      if (addressResult.affectedRows === 0) {
        databaseInsertError('No se ha podido actualizar la dirección');
      }
    }

    // Devolver el resultado.
    return { message: 'Cliente y dirección actualizados correctamente' };
  } catch (error) {
    databaseInsertError(
      error.message ||
        'Error en el modelo al actualizar el cliente y la dirección'
    );
  }
};
