import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";

export const getProfileUserService = async (id_user) => {
  try {
    const user = await selectUserByIdModel(id_user);
    return user;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    if (!error.statusCode) {
      throw internalServerError(
        error.message || 'Error al insertar usuario'
      );
    }
    throw error;
  }
};