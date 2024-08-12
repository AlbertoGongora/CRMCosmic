import { newCustomerSchema } from '../../schemas/customer/newCustomerSchema.js';
import { insertCustomerService } from '../../services/customer/insertCustomerService.js';
import { handleErrorController } from '../../utils/handleError.js';
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
    handleErrorController(
      error,
      next,
      'GET_USER_LIST_CONTROLLER_ERROR',
      'Error en el controlador de registro de cliente'
    );
  }
};
