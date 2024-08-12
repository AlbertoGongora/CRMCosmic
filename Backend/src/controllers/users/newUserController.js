import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { newUserSchema } from '../../schemas/user/newUserSchema.js';
import { insertUserService } from '../../services/user/insertUserService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const newUserController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newUserSchema, req.body);

    // Insertamos el usuario en la base de datos
    await insertUserService(req.body);

    // Respondemos al usuario
    res.status(201).send({
      status: 'ok',
      message: 'El usuario ha sido creado, a la espera de validación',
    });
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'NEW_USER_CONTROLLER_ERROR',
      'Error en el controlador de registro de usuario'
    );
  }
};
