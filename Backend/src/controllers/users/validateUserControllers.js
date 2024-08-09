import { validateUserService } from "../../services/user/validateUserService.js";
import { success } from "../../utils/success.js";

export const validateUserController = async (req, res, next) => {
    try {
        // Obtener el código de registro de la URL
        const registration_code = decodeURIComponent(req.params.registration_code);

        await validateUserService(registration_code);

        res.status(201).send(success({message: 'El usuario ha sido validado exitosamente'}));
    } catch (error) {
        next(controllerError(
            'VALIDATE_USER_CONTROLLER_ERROR', 
            error.message || 'Error en el controlador al validar un usuario', 
            error.statusCode || 500
          ));

    }
};