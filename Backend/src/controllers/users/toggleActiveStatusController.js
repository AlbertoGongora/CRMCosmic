import { controllerError } from "../../services/error/errorServer.js";
import { toggleActivationService } from "../../services/user/toggleActivationService.js";


export const toggleActiveStatusController = async (req, res, next) => {

    try {
        // Desactivamos al usuario en la base de datos.
        const user = await toggleActivationService(req.body.id)

        // Devolvemos el usuario actualizado.
        const isActive = user.active === 1 ? true : false
        const message = `Estado del usuario cambiado a: ${isActive ? 'Activo' : 'Inactivo'} `

        // Respondemos al usuario
        res.send({
            status: 'ok',
            isActive,
            message
        });
    } catch (error) {
        // Si el error ya tiene un código y mensaje, lo pasamos tal cual
        if (error.code && error.statusCode) {
            next(error);
        } else {
            // De lo contrario, lo envolvemos en un error del controlador
            next(controllerError(
                'UPDATE_STATUS_USER_CONTROLLER_ERROR', 
                error.message || 'Error en el controlador al cambiar el estado de un usuario', 
                error.statusCode || 500
            ));
        }
    }
}