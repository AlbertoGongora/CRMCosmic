import { controllerError } from "../../services/error/errorServer.js";
import { getProfileUserService } from "../../services/user/getProfileUserService.js";

export const getProfileUserController = async (req, res, next) => {
    try {
      const user = await getProfileUserService(req.user.id_user);
  
      res.status(200).send({
        status: 'ok',
        data: user,
      });
    } catch (error) {
      next(controllerError(
        'GET_PROFILE_USER_CONTROLLER_ERROR', 
        error.message || 'Error del controlador en la obtencion del perfil del usuario', 
        error.statusCode || 500
      ));
    }
  };