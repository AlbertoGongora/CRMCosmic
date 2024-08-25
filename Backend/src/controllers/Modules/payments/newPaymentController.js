import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { newPaymentSchema } from '../../../schemas/Modules/payments/newPaymentSchema.js';
import { newPaymentService } from '../../../services/Modules/payments/insertPaymentService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const newPaymentController = async (req, res, next) => {
  try {
    // Validar el body
    await validateSchemaUtil(newPaymentSchema, req.body);

    // Insertar el pago en la BD
    const data = await newPaymentService(req.body);

    // Enviar Respuesta
    res.status(201).send({
      status: 'ok',
      message: 'Pago creado con exito',
      data: data,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'INSERT_PAYMENT_CONTROLLER_ERROR',
      'Error en el controlador al insertar el pago'
    );
  }
};
