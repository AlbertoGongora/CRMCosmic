import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { deleteUserSchema } from "../../schemas/user/updateUserSchema.js";
import { success } from "../../utils/success.js";
import { deleteUserService } from "../../services/user/deleteUserService.js";
import { handleErrorController } from "../../utils/handleError.js";


export const deleteUserController = async (req, res, next) => {
    try {
        // Validar el body con Joi.
        await validateSchemaUtil(deleteUserSchema, req.params);

        // Pasamos el id del usuario que queremos eliminar al servicio
        await deleteUserService(req.params.id_user);

        // Envía una respuesta de éxito
        res.send(success({ message: 'Usuario eliminado correctamente' }));
    } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
        error,
        next,
        'DELETE_USER_CONTROLLER_ERROR',
        'Error en el controlador al eliminar un usuario'
      );
    }
};