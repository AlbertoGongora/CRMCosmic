import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { updateUserService } from '../../services/user/updateUserService.js';
import { updateUserSchema } from '../../schemas/user/updateUserSchema.js';
import { updateAvatarUserService } from '../../services/user/updateAvatarUserService.js';
import { handleErrorController } from '../../utils/handleError.js';

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
    res.status(200).send({
      status: 'ok',
      message: message.trim(),
      data: data,
    });
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'UPDATE_USER_CONTROLLER_ERROR',
      'Error en el controlador al modificar un usuario'
    );
  }
};
