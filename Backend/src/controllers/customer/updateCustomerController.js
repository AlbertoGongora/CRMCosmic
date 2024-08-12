import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { updateCustomerService } from '../../services/customer/updateCustomerService.js';
import { updateCustomerSchema } from '../../schemas/customer/updateCustomerSchema.js';
import { controllerError } from '../../services/error/errorServer.js';

export const updateCustomerController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(updateCustomerSchema, req.body);

    // Obtenemos el id del usuario.
    const customerId = req.params.customerId;

    // Actualizamos el cliente en la base de datos.
    const customer = await updateCustomerService(customerId, req.body);

    // Devolvemos el usuario actualizado.
    res.send({
      status: 'ok',
      message: 'Cliente actualizado',
      data: { customer },
    });
  } catch (error) {
    next(
      controllerError(
        'UPDATE_USER_CONTROLLER_ERROR',
        error.message || 'Error en el controlador al modificar un cliente',
        error.statusCode || 500
      )
    );
  }
};
