import { findByRegistrationCodeModel } from "../../models/user/findByRegistrationCodeModel.js";
import { updateUserActiveModel } from "../../models/user/updateUserActiveModel.js";
import { internalServerError } from "../error/errorServer.js";


export const validateUserService = async (registration_code) => {
    try {
        const userId = await findByRegistrationCodeModel(registration_code);

        const { id_user } = userId;

        // Actualizar el estado de activación del usuario
        await updateUserActiveModel(id_user);
    } catch (error) {
        if (!error.statusCode) {
            internalServerError(
              error.message || 'Error al validar un usuario'
            );
          }
          throw error;
    }
}