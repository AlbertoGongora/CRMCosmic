import { selectCustomerByIdModel } from '../../models/customer/selectCustomerByIdModel.js';
import { updateCustomerModel } from '../../models/customer/updateCustomerModel.js';
import { internalServerError } from '../error/errorServer.js';
import { invalidCredentials } from '../error/errorService.js';

export const updateCustomerService = async (customerId, body) => {
  try {
    const {
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
      country,
    } = body;

    // Comprobar si el email ya existe.
    const existCustomer = await selectCustomerByIdModel(customerId);

    // Si existe, comprobar si es el mismo cliente.
    if (existCustomer && existCustomer.id_customer !== customerId) {
      invalidCredentials();
    }

    // Actualizar el cliente en la base de datos.
    await updateCustomerModel(
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
    );

    // Obtener el cliente actualizado.
    const customer = await selectCustomerByIdModel(customerId);

    // Devolver el cliente actualizado.
    return customer;
  } catch (error) {
    if (!error.statusCode) {
      internalServerError(error.message || 'Error al actulizar el  cliente');
    }
    throw error;
  }
};
