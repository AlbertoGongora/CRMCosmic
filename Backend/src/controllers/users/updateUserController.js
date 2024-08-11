import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { updateUserService } from '../../services/user/updateUserService.js';
import { updateUserSchema } from '../../schemas/user/updateUserSchema.js';
import { updateAvatarUserService } from '../../services/user/updateAvatarUserService.js';

export const updateUserController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(updateUserSchema, req.body);
    await validateSchemaUtil(updateUserSchema, req.files || {});

    // Obtenemos el id del usuario.
    const userId = req.user.id_user;

    // Cremaos variables vacias
    let message = '';
    let data = {};

    // Actualizamos el usuario en la base de datos.
    if (req.files?.avatar) {
    // Guardamos el avatar en la carpeta de subida de archivos. Redimensionamos a un ancho de 100 píxeles.
    const avatarName = await updateAvatarUserService(
      userId,
      req.files.avatar,
      100
    );
    message += 'Avatar actualizado ';
    data.avatarName = avatarName;
    }

    const user = await updateUserService(userId, req.body);
    message += 'Usuario actualizado';
    data.user = user;

    // Devolvemos el resultado.
    res.send({
      status: 'ok',
      message: message.trim(),
      data: data,
    });
  } catch (error) {
    // Si el error ya tiene un código y mensaje, lo pasamos tal cual
    if (error.code && error.statusCode) {
      next(error);
    } else {
      // De lo contrario, lo envolvemos en un error del controlador
      next(controllerError(
        'UPDATE_USER_CONTROLLER_ERROR', 
        error.message || 'Error en el controlador al modificar un usuario', 
        error.statusCode || 500
      ));
    }
  }
};
