import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { deleteUserSchema } from "../../schemas/user/updateUserSchema.js";
import { success } from "../../utils/success.js";
import { controllerError } from "../../services/error/errorServer.js";
import { deleteUserService } from "../../services/user/deleteUserService.js";


export const deleteUserController = async (req, res, next) => {
    try {
        // Validar el body con Joi.
        await validateSchemaUtil(deleteUserSchema, req.params);

        // Pasamos el id del usuario que queremos eliminar al servicio
        await deleteUserService(req.params.id_user);

        // Envía una respuesta de éxito
        res.send(success({ message: 'Usuario eliminado correctamente' }));
    } catch (error) {
        // Si el error ya tiene un código y mensaje, lo pasamos tal cual
        if (error.code && error.statusCode) {
            next(error);
        } else {
            // De lo contrario, lo envolvemos en un error del controlador
            next(controllerError(
                'DELETE_USER_CONTROLLER_ERROR', 
                error.message || 'Error en el controlador al eliminar un usuario', 
                error.statusCode || 500
            ));
        }
    }
};