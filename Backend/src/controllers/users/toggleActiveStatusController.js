import { toggleActivationService } from '../../services/user/toggleActivationService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const toggleActiveStatusController = async (req, res, next) => {
  try {
    // Desactivamos al usuario en la base de datos.
    const user = await toggleActivationService(req.body.id);

    // Devolvemos el usuario actualizado.
    const isActive = user.active === 1 ? true : false;
    const message = `Estado del usuario cambiado a: ${isActive ? 'Activo' : 'Inactivo'} `;

    // Respondemos al usuario
    res.status(200).send({
      status: 'ok',
      isActive,
      message,
    });
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'UPDATE_STATUS_USER_CONTROLLER_ERROR',
      'Error en el controlador al cambiar el estado de un usuario'
    );
  }
};
