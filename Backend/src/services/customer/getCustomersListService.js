import { selectCustomersListModel } from '../../models/customer/selectCustomerListModel.js';
import { internalServerError } from '../error/errorServer.js';

export const getCustomersListService = async () => {
  try {
    const users = await selectCustomersListModel();
    return users;
  } catch (error) {
    if (!error.statusCode) {
      internalServerError(
        error.message ||
          'Error al obtener la lista de clientes desde el servicio'
      );
    }
    throw error;
  }
};
