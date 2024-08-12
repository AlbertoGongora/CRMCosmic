import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { handleErrorService } from "../../utils/handleError.js";

export const getProfileUserService = async (id_user) => {
  try {
    const user = await selectUserByIdModel(id_user);
    return user;
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorService(
      error,
      'GET_PROFILE_USER_SERVICE_ERROR',
      'Error en el servicio al insertar usuario'
    );
  }
};