import { validateUserService } from '../../services/user/validateUserService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const validateUserController = async (req, res, next) => {
  try {
    // Obtener el código de registro de la URL
    const registration_code = decodeURIComponent(req.params.registration_code);

    // Pasamos el codigo de registro para validarlo en el servicio
    await validateUserService(registration_code);

    res
      .status(201)
      .send({
        status: 'ok',
        message: 'El usuario ha sido validado exitosamente',
      });
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'VALIDATE_USER_CONTROLLER_ERROR',
      'Error en el controlador al validar un usuario'
    );
  }
};
