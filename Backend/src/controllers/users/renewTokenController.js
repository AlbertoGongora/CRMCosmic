import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { generateAccessToken } from "../../utils/generateAccessToken.js";
// import { insertTokenCookie } from "../../utils/insertTokenCookie.js";

export const renewTokenController = async (req, res, next) => {
  try {
    // Obtengo la información del usuario
    const user = await selectUserByIdModel(req.user);

    // Generar un nuevo token de acceso
    const token = generateAccessToken(user);

    // Enviar una respuesta al cliente
    res.status(200).send({
      message: 'Token renovado exitosamente',
      token: token
    });
  } catch (error) {
    // Si el error ya tiene un código y mensaje, lo pasamos tal cual
    if (error.code && error.statusCode) {
      next(error);
    } else {
      // De lo contrario, lo envolvemos en un error del controlador
      next(controllerError(
        'TOKEN_USER_CONTROLLER_ERROR', 
        error.message || 'Error en el controlador al regenerar el token', 
        error.statusCode || 500
      ));
    }
  }
}