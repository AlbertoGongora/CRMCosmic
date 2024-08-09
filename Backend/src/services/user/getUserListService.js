import { getUserListModel } from "../../models/user/getUserListModal.js";
import { internalServerError } from "../error/errorServer.js";

export const getUserListService = async () => {
  try {
    const users = await getUserListModel();
    return users;
  } catch (error) {
    if (!error.statusCode) {
      internalServerError(
        error.message || 'Error al obtener la lista de usuarios desde el servicio'
      );
    }
    throw error;
  }
};
