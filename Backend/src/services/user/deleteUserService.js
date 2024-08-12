import { deleteUserModel } from "../../models/user/deleteUserModel.js";
import { selectModulesByUserIdModel } from "../../models/user/selectModulesByUserIdModel.js";
import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { handleErrorService } from "../../utils/handleError.js";
import { internalServerError } from "../error/errorServer.js";
import { moduleAssignedError } from "../error/errorService.js";


export const deleteUserService = async (user_id) => {
    try{
        // Verificación de la existencia del usuario
        const existingUser = await selectUserByIdModel(user_id);
        if (user_id !== existingUser.id_user) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        // Verificamos si el usuario no tiene modulos asignados
        const userModules = await selectModulesByUserIdModel(user_id);
        if (userModules.length > 0) {
            moduleAssignedError();
        }

        // Eliminación del usuario
        await deleteUserModel(user_id);
    } catch (error) {
        // Usamos la función modularizada para manejar el error
        handleErrorService(
        error,
        'DELETE_USERS_SERVICE_ERROR',
        'Error al elimniar un usuario'
        );
    }
};