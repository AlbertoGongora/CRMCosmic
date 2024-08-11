import { controllerError } from "../../services/error/errorServer.js";
import { getProfileUserService } from "../../services/user/getProfileUserService.js";

export const getProfileUserController = async (req, res, next) => {
  try {
    // Pasamos al servicio el id del usuario para obtner los datos del perfil.
    const user = await getProfileUserService(req.user.id_user);

    // Enviamos respuesta con los datos esperados.
    res.status(200).send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    // Si el error ya tiene un código y mensaje, lo pasamos tal cual
    if (error.code && error.statusCode) {
      next(error);
    } else {
      // De lo contrario, lo envolvemos en un error del controlador
      next(controllerError(
        'GET_PROFILE_USER_CONTROLLER_ERROR', 
        error.message || 'Error del controlador en la obtencion del perfil del usuario', 
        error.statusCode || 500
      ));
    }
  }
};