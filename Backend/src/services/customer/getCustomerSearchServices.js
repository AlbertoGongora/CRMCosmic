import { selectCustomerSearchModel } from '../../models/customer/selectCustomerSearchModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const getCustomerSearchService = async (search) => {
  try {
    // Buscamos en la base de datos el usuario.
    const customer = await selectCustomerSearchModel(search);

    return customer;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SEARCH_SERVICE_ERROR',
      'Error al obtener la lista de busquedas de clientes desde el servicio'
    );
  }
};
