import { selectUserSearchModel } from "../../models/user/selectUserSearchModel.js";
import { handleErrorService } from "../../utils/handleError.js";

export const getUserSearchService = async (search) => {
    try {
        // Buscamos en la base de datos el usuario.
        const user = await selectUserSearchModel(search);
    
        return user;
    } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorService(
      error,
      'GET_USER_SEARCH_SERVICE_ERROR',
      'Error al obtener la lista de busquedas de usuarios desde el servicio'
    );
  }
};