import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { internalServerError } from "../error/errorServer.js";

export const getProfileUserService = async (id_user) => {
  try {
    const user = await selectUserByIdModel(id_user);
    return user;
  } catch (error) {
    if (!error.statusCode) {
      internalServerError(
        error.message || 'Error al insertar usuario'
      );
    }
    throw error;
  }
};