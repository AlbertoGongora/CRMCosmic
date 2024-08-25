import { selectPaymentService } from '../../../services/Modules/payments/selectPaymentService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const deletePaymentController = async (req, res, next) => {
  try {
    // Verifico si esta cancelado
    const deletePayment = await selectPaymentService(req.params.paymentsId);

    // Respondemos al cliente.
    res
      .status(200)
      .send({ status: 'ok', message: 'Pago eliminado', data: deletePayment });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_PAYMENT_CONTROLLER_ERROR',
      'Error en el controlador al eliminar una pago'
    );
  }
};
