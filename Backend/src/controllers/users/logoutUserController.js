import { controllerError } from "../../services/error/errorServer.js";
import { success } from "../../utils/success.js";

export const logoutUserController = async (req, res, next) => {
    try {
        // Lógica para eliminar el token de autenticación de las cookies del servidor
        res.clearCookie('token');

        // Devolver una respuesta al cliente
        res.status(201).send(success({ message: 'Logout exitoso' }));
    } catch (error) {
        // Si el error ya tiene un código y mensaje, lo pasamos tal cual
        if (error.code && error.statusCode) {
            next(error);
        } else {
            // De lo contrario, lo envolvemos en un error del controlador
            next(controllerError(
                'LOGOUT_USER_CONTROLLER_ERROR', 
                error.message || 'Error en el controlador al hacer logout', 
                error.statusCode || 500
            ));
        }
    }
};