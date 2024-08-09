import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { deleteUserSchema } from "../../schemas/user/updateUserSchema.js";
import { success } from "../../utils/success.js";
import { controllerError } from "../../services/error/errorServer.js";
import { deleteUserService } from "../../services/user/deleteUserService.js";


export const deleteUserController = async (req, res, next) => {
    try {
        // Validar el body con Joi.
        await validateSchemaUtil(deleteUserSchema, req.params);

        await deleteUserService(req.params.id_user);

        // Envía una respuesta de éxito
        res.send(success({ message: 'Usuario eliminado correctamente' }));
    } catch (error) {
        // Manejo de errores
        next(controllerError(
            'DELETE_USER_CONTROLLER_ERROR', 
            error.message || 'Error en el controlador al eliminar un usuario', 
            error.statusCode || 500
          ));
    }
};