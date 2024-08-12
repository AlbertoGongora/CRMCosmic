import { getUserListService } from "../../services/user/getUserListService.js";
import { handleErrorController } from "../../utils/handleError.js";

export const getUserListController = async (req, res, next) => {
  try {
    // Recibimos del servicio todos los datos solicitados, en este caso la lista de usuarios.
    const usersList = await getUserListService();

    // Devolvemos el resultado en la petición.
    res.status(200).send({
      status: 'ok',
      data: usersList,
    });
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'GET_USER_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de usuarios'
    );
  }
};
