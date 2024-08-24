import { changePaymentStatusModel } from '../../../models/Modules/payments/changePaymentStatusModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const changePaymentStatusService = async (body) => {
  try {
    const { payment_id, new_status } = body;

    await changePaymentStatusModel(payment_id, new_status);
  } catch (error) {
    handleErrorService(
      error,
      'CANCEL_PAYMENT_SERVICE_ERROR',
      'Error en el servicio al cambiar el estado en la base de datos'
    );
  }
};
