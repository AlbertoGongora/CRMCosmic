import { findByRegistrationCodeModel } from "../../models/user/findByRegistrationCodeModel.js";
import { updateUserActiveModel } from "../../models/user/updateUserActiveModel.js";
import { handleErrorService } from "../../utils/handleError.js";

export const validateUserService = async (registration_code) => {
    try {
        const userId = await findByRegistrationCodeModel(registration_code);

        const { id_user } = userId;

        // Actualizar el estado de activación del usuario
        await updateUserActiveModel(id_user);
    } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorService(
      error,
      'VALIDATE_USER_SERVICE_ERROR',
      'Error en el servicio al validar un usuario'
    );
    }
};