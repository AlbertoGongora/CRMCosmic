import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { recoveryPasswordSchema } from '../../schemas/user/recoveryPasswordSchema.js'; 
import { serverError } from '../../services/error/errorService.js';
import { forgotPasswordService } from '../../services/user/forgotPasswordService.js';
import { success } from '../../utils/success.js';
import { sendRecoveryPaswordEmail } from '../../services/email/emailService.js';

export const forgotPasswordController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(recoveryPasswordSchema, req.body);

    const { email } = req.body;

    // Comentado para evitar envío de correos electrónicos luego remplazar el de abajo
    const new_registration_code = await forgotPasswordService(email);

    // Comentado para evitar envío de correos electrónicos
    // Enviar correo electrónico de cambio de contraseña
    await sendRecoveryPaswordEmail(email, new_registration_code);
    
    // Devolvemos el usuario actualizado.
    res.status(200).send(success({message: 'Correo enviado'}));
  } catch (error) {
    next(controllerError(
      'PASSWORD_USER_CONTROLLER_ERROR', 
      error.message || 'Error en el controlador de la peticion de restaurar contraseña', 
      error.statusCode || 500
    )); 
  }
};
