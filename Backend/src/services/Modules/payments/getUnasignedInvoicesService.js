import { getUnasignedInvoicesModel } from '../../../models/Modules/payments/getUnasignedInvoicesModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getUnasignedInvoicesService = async () => {
  try {
    const response = await getUnasignedInvoicesModel();

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'GET_UNSIGBED_PAYMENT_LIST_SERVICE_ERROR',
      'Error al obtener la facturas asignada desde el servicio'
    );
  }
};
