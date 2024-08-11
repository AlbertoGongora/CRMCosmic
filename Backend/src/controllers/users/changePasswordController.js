import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { changePasswordSchema } from '../../schemas/user/changePasswordSchema.js';
import { changePasswordService } from '../../services/user/changePasswordService.js';
import { success } from '../../utils/success.js';
import { controllerError } from '../../services/error/errorServer.js';

export const changePasswordController = async (req, res, next) => {
  try {
    // Validar el esquema del cuerpo de la solicitud
    await validateSchemaUtil(changePasswordSchema, req.body);
    
    // Obtener el id del usuario e insertar el password
    const response = await changePasswordService(req.user.id_user, req.body);
   
    // Responder con éxito
    res.send(success(response));
  } catch (error) {
    // Si el error ya tiene un código y mensaje, lo pasamos tal cual
    if (error.code && error.statusCode) {
      next(error);
    } else {
      // De lo contrario, lo envolvemos en un error del controlador
      next(controllerError(
        'PASSWORD_USER_CONTROLLER_ERROR', 
        error.message || 'Error en el controlador de cambio de contraseña', 
        error.statusCode || 500
      ));
    }
  }
};
