import { getUserListModel } from "../../models/user/getUserListModal.js";
import { handleErrorService } from "../../utils/handleError.js";

export const getUserListService = async () => {
  try {
    const users = await getUserListModel();
    return users;
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorService(
      error,
      'GET_USER_LIST_SERVICE_ERROR',
      'Error al obtener la lista de usuarios desde el servicio'
    );
  }
};