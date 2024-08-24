import { selectPaymentsListModel } from '../../../models/Modules/payments/selectPaymentsListModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const selectPaymentsListService = async () => {
  try {
    const listPayments = await selectPaymentsListModel();

    return listPayments;
  } catch (error) {
    handleErrorService(
      error,
      'GET_PAYMENT_LIST_SERVICE_ERROR',
      'Error al obtener la lista de pagos desde el servicio'
    );
  }
};
