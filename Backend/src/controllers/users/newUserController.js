// src/controllers/user/newUserController.js
import { newUserSchema } from '../../schemas/user/newUserSchema.js';
import { controllerError } from '../../services/error/errorServer.js';
import { insertUserService } from '../../services/user/insertUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

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
      // Si el error ya tiene un código y mensaje, lo pasamos tal cual
      if (error.code && error.statusCode) {
        next(error);
      } else {
        // De lo contrario, lo envolvemos en un error del controlador
        next(
          controllerError(
          'NEW_USER_CONTROLLER_ERROR', 
          error.message || 'Error en el controlador de registro de usuario', 
          error.statusCode || 500
        ));
    }
  }
};
