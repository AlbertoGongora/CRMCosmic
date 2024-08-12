import { newCustomerSchema } from '../../schemas/customer/newCustomerSchema.js';
import { insertCustomerService } from '../../services/customer/insertCustomerService.js';
import { controllerError } from '../../services/error/errorServer.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newCustomerController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newCustomerSchema, req.body);

    // Insertamos el cliente en la base de datos
    const response = await insertCustomerService(req.body);

    // Respondemos al cliente
    res.status(201).send({
      status: 'ok',
      message: response.message,
    });
  } catch (error) {
    next(
      controllerError(
        'NEW_USER_CONTROLLER_ERROR',
        error.message || 'Error en el controlador de registro de cliente',
        error.statusCode || 500
      )
    );
  }
};
