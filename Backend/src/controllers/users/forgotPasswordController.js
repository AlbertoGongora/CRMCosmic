import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { recoveryPasswordSchema } from '../../schemas/user/recoveryPasswordSchema.js'; 
import { forgotPasswordService } from '../../services/user/forgotPasswordService.js';
import { success } from '../../utils/success.js';
import { sendRecoveryPasswordEmail } from '../../services/email/emailService.js';
import { controllerError } from '../../services/error/errorServer.js';

export const forgotPasswordController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(recoveryPasswordSchema, req.body);

    // Extraemos el email del body
    const { email } = req.body;

    // Pasamos el email que queremos confirmar y recibimos el nuevo codigo de registro para enviarlo por email al usuario pueda cambiar la contraseña.
    const new_registration_code = await forgotPasswordService(email);

    // Enviar correo electrónico de cambio de contraseña
    await sendRecoveryPasswordEmail(email, new_registration_code);
    
    // Devolvemos el usuario actualizado.
    res.status(200).send(success({message: 'Correo enviado'}));
  } catch (error) {
    // Si el error ya tiene un código y mensaje, lo pasamos tal cual
    if (error.code && error.statusCode) {
      next(error);
    } else {
      // De lo contrario, lo envolvemos en un error del controlador
      next(controllerError(
        'PASSWORD_USER_CONTROLLER_ERROR', 
        error.message || 'Error en el controlador de la peticion de restaurar contraseña', 
        error.statusCode || 500
      )); 
    }
  }
};
