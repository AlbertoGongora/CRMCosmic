import { success } from "../../utils/success.js";

export const logoutUserController = async (req, res, next) => {
    try {
        // Lógica para eliminar el token de autenticación de las cookies
        res.clearCookie('token');

        // Devolver una respuesta al cliente
        res.status(201).send(success({ message: 'Logout exitoso' }));
    } catch (error) {
        next(controllerError(
            'LOGOUT_USER_CONTROLLER_ERROR', 
            error.message || 'Error en el controlador al hacer logout', 
            error.statusCode || 500
          ));
    }
};