import { getProfileUserService } from "../../services/user/getProfileUserService.js";
import { handleErrorController } from "../../utils/handleError.js";

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
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'Error del controlador en la obtencion del perfil del usuario'
    );
  }
};