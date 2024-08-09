import { selectUserSearchModel } from "../../models/user/selectUserSearchModel.js";
import { internalServerError } from "../error/errorServer.js";

export const getUserSearchService = async (search) => {
    try {
        // Buscamos en la base de datos el usuario.
        const user = await selectUserSearchModel(search);
    
        return user;
    } catch (error) {
        if (!error.statusCode) {
          internalServerError(
            error.message || 'Error al obtener la lista de busquedas de usuarios desde el servicio'
          );
        }
        throw error;
    }
}