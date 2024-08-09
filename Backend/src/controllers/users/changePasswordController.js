import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { changePasswordSchema } from '../../schemas/user/changePasswordSchema.js';
import { changePasswordService } from '../../services/user/changePasswordService.js';
import { success } from '../../utils/success.js';

export const changePasswordController = async (req, res, next) => {
  try {
    // Validar el esquema del cuerpo de la solicitud
    await validateSchemaUtil(changePasswordSchema, req.body);
    
    // Obtener el id del usuario e insertar el password
    const response = await changePasswordService(req.user.id_user, req.body);
   
    // Responder con éxito
    res.send(success(response));
  } catch (error) {
    next(controllerError(
      'PASSWORD_USER_CONTROLLER_ERROR', 
      error.message || 'Error en el controlador de cambio de contraseña', 
      error.statusCode || 500
    ));
  }
};
