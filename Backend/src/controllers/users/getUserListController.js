import { controllerError } from "../../services/error/errorServer.js";
import { getUserListService } from "../../services/user/getUserListService.js";

export const getUserListController = async (req, res, next) => {
  try {
    // Recibimos del servico todos los datos solicitados, en este caso la lista de usuarios.
    const usersList = await getUserListService();

    // Devolvemos el resultado en la peticion.
    res.status(200).send({
      status: 'ok',
      data: usersList,
    });
  } catch (error) {
    // Si el error ya tiene un código y mensaje, lo pasamos tal cual
    if (error.code && error.statusCode) {
      next(error);
    } else {
      // De lo contrario, lo envolvemos en un error del controlador
      next(controllerError(
        'GET_USER_LIST_CONTROLLER_ERROR', 
        error.message || 'Error en el controlador al obtener la lista de usuarios', 
        error.statusCode || 500
      ));
    }
  }
};