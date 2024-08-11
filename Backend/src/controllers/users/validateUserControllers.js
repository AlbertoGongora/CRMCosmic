import { validateUserService } from "../../services/user/validateUserService.js";
import { success } from "../../utils/success.js";

export const validateUserController = async (req, res, next) => {
    try {
        // Obtener el código de registro de la URL
        const registration_code = decodeURIComponent(req.params.registration_code);

        // Pasamos el codigo de registro para validarlo en el servicio
        await validateUserService(registration_code);

        res.status(201).send(success({message: 'El usuario ha sido validado exitosamente'}));
    } catch (error) {
        // Si el error ya tiene un código y mensaje, lo pasamos tal cual
        if (error.code && error.statusCode) {
            next(error);
        } else {
            // De lo contrario, lo envolvemos en un error del controlador
            next(controllerError(
                'VALIDATE_USER_CONTROLLER_ERROR', 
                error.message || 'Error en el controlador al validar un usuario', 
                error.statusCode || 500
            ));
        }
    }
};