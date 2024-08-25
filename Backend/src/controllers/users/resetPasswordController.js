import { updatePasswordService } from '../../services/user/updatePasswordService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { changeResetPasswordSchema } from '../../schemas/user/changeResetPasswordSchema.js';
import { success } from '../../utils/success.js';
import { handleErrorController } from '../../utils/handleError.js';

export const resetPasswordController = async (req, res, next) => {
  try {
    // Validar el esquema del cuerpo de la solicitud
    await validateSchemaUtil(changeResetPasswordSchema, req.body);

    // Extraemos el codigo de regitro del req
    const registration_code = decodeURIComponent(req.params.registration_code);

    // Actualizar la contraseña en la base de datos
    const response = await updatePasswordService(registration_code, req.body);

    // Responder al cliente
    res.status(200).send(success(response));
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'PASSWORD_USER_CONTROLLER_ERROR',
      'Error en el controlador al resetear la contraseña'
    );
  }
};
