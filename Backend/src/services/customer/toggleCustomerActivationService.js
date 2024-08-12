import { selectCustomerByIdModel } from '../../models/customer/selectCustomerByIdModel.js';
import { toggleCustomerActiveModel } from '../../models/customer/toggleCustomerActiveModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const toggleCustomerActivationService = async (id_customer) => {
  try {
    // Comprobar si el cliente existe.
    const customer = await selectCustomerByIdModel(id_customer);

    if (!customer) {
      notFoundError('Cliente');
    }

    // Condicional: si está activo desactivar, y viceversa
    const newStatus = customer.active === 0 ? true : false;

    // Actualizar el usuario en la base de datos.
    await toggleCustomerActiveModel(id_customer, newStatus);

    // Obtener el usuario actualizado.
    const updatedCustomer = await selectCustomerByIdModel(id_customer);

    return updatedCustomer;
  } catch (error) {
    handleErrorService(
      error,
      'GET_USER_LIST_SERVICE_ERROR',
      'Error en el servicio al cambiar el estado de un cliente'
    );
  }
};
