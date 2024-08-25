import { handleErrorController } from '../../utils/handleError.js';

export const logoutUserController = async (req, res, next) => {
  try {
    // Lógica para eliminar el token de autenticación de las cookies del servidor
    res.clearCookie('token');

    // Devolver una respuesta al cliente
    res.status(201).send({ status: 'ok', message: 'Logout exitoso' });
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'LOGOUT_USER_CONTROLLER_ERROR',
      'Error en el controlador al hacer logout'
    );
  }
};
