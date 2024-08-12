import { selectCustomersListModel } from '../../models/customer/selectCustomerListModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const getCustomersListService = async () => {
  try {
    const users = await selectCustomersListModel();
    return users;
  } catch (error) {
    handleErrorService(
      error,
      'GET_USER_LIST_SERVICE_ERROR',
      'Error al obtener la lista de clientes desde el servicio'
    );
  }
};
