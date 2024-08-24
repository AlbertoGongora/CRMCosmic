import { selectPaymentSearchModel } from '../../../models/Modules/payments/selectPaymentSearchModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getPaymentSearchService = async (search) => {
  try {
    // Buscamos en la base de datos
    const response = await selectPaymentSearchModel(search);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'GET_PAYMENT_SEARCH_SERVICE_ERROR',
      'Error en el servicio al obtener la lista de busquedas de pagos'
    );
  }
};
