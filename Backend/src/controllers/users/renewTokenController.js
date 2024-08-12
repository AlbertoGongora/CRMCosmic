import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { generateAccessToken } from "../../utils/generateAccessToken.js";
import { handleErrorController } from "../../utils/handleError.js";

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
    // Usamos la función modularizada para manejar el error
    handleErrorController(
      error,
      next,
      'TOKEN_USER_CONTROLLER_ERROR',
      'Error en el controlador al regenerar el token'
    );
  }
}