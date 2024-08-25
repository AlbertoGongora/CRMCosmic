import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { cancelPaymentSchema } from '../../../schemas/Modules/payments/newPaymentSchema.js';
import { handleErrorController } from '../../../utils/handleError.js';
import { changePaymentStatusService } from '../../../services/Modules/payments/changePaymentStatusService.js';

export const cancelPaymentController = async (req, res, next) => {
  try {
    // Validar los datos
    await validateSchemaUtil(cancelPaymentSchema, req.body);

    // Actualizar el pago
    await changePaymentStatusService(req.body);

    res.status(200).send({
      status: 'ok',
      message: 'Estado del pago actualizado',
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CANCEl_PAYMENT_CONTROLLER_ERROR',
      'Error en el controlador al cancelar el pago'
    );
  }
};
