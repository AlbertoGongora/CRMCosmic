import { selectCustomerSearchModel } from '../../models/customer/selectCustomerSearchModel.js';

export const getCustomerSearchService = async (search) => {
  try {
    // Buscamos en la base de datos el usuario.
    const customer = await selectCustomerSearchModel(search);

    return customer;
  } catch (error) {
    if (!error.statusCode) {
      internalServerError(
        error.message ||
          'Error al obtener la lista de busquedas de clientes desde el servicio'
      );
    }
    throw error;
  }
};
