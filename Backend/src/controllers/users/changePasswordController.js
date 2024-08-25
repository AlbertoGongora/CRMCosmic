import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { changePasswordSchema } from '../../schemas/user/changePasswordSchema.js';
import { changePasswordService } from '../../services/user/changePasswordService.js';
import { success } from '../../utils/success.js';
import { handleErrorController } from '../../utils/handleError.js';

export const changePasswordController = async (req, res, next) => {
  try {
    // Validar el esquema del cuerpo de la solicitud
    await validateSchemaUtil(changePasswordSchema, req.body);

    // Obtener el id del usuario e insertar el password
    const response = await changePasswordService(req.user.id_user, req.body);

    // Responder con éxito
    res.status(200).send(success(response));
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'PASSWORD_USER_CONTROLLER_ERROR',
      'Error en el controlador de cambio de contraseña'
    );
  }
};
