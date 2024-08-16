import { selectInvoiceSearchModel } from '../../../models/Modules/invoices/selectInvoiceSearchModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getInvoiceSearchService = async (search) => {
  try {
    // Buscamos en la base de datos el usuario.
    const user = await selectInvoiceSearchModel(search);

    return user;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SALES_SEARCH_SERVICE_ERROR',
      'Error en el servicio al obtener la lista de busquedas de facturas'
    );
  }
};
