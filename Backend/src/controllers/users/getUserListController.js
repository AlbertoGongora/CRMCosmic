import { controllerError } from "../../services/error/errorServer.js";
import { getUserListService } from "../../services/user/getUserListService.js";

export const getUserListController = async (req, res, next) => {
  try {
    const usersList = await getUserListService();

    res.status(200).send({
      status: 'ok',
      data: usersList,
    });
  } catch (error) {
    next(controllerError(
      'GET_USER_LIST_CONTROLLER_ERROR', 
      error.message || 'Error en el controlador al obtener la lista de usuarios', 
      error.statusCode || 500
    ));
  }
};