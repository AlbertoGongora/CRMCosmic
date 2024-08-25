import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { updateCustomerService } from '../../services/customer/updateCustomerService.js';
import { updateCustomerSchema } from '../../schemas/customer/updateCustomerSchema.js';
import { handleErrorService } from '../../utils/handleError.js';

export const updateCustomerController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(updateCustomerSchema, req.body);

    // Actualizamos el cliente en la base de datos.
    const customer = await updateCustomerService(
      req.params.customerId,
      req.body
    );

    // Devolvemos el usuario actualizado.
    res.status(200).send({
      status: 'ok',
      message: 'Cliente actualizado',
      data: { customer },
    });
  } catch (error) {
    handleErrorService(
      error,
      next,
      'UPDATE_CUSTOMER_CONTROLLER_ERROR',
      'Error en el controlador al modificar un cliente'
    );
  }
};
