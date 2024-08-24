import { deletePaymentModel } from '../../../models/Modules/payments/deletePaymentModel.js';
import { selectPaymentByIdModel } from '../../../models/Modules/payments/selectPaymentByIdModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { invalidCredentials } from '../../error/errorService.js';

export const selectPaymentService = async (paymentsId) => {
  try {
    // compruebo que existe y esta cancelado
    const payment = await selectPaymentByIdModel(paymentsId);

    if (payment === undefined || payment.id_payment !== paymentsId) {
      invalidCredentials('El pago no existe');
    }

    if (payment.payment_status !== 'cancelled') {
      invalidCredentials('El pago no esta cancelado');
    }

    // Eliminar el pago de la base de datos.
    const response = await deletePaymentModel(paymentsId);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_INVOICE_SERVICE_ERROR',
      'Error en el servicio al borrar un pago'
    );
  }
};
