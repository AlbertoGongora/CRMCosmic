import bcrypt from 'bcrypt';
import { invalidCredentials } from "../error/errorService.js";
import { updatePasswordModel } from "../../models/user/updatePasswordModel.js";
import { selectIdByRegistrationCode } from '../../models/user/selectIdByRegistrationCodeModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const updatePasswordService = async (registration_code, body) => {
    try {
         // Obtenemos el usuario y el código de registro
        const user = await selectIdByRegistrationCode(registration_code);

        // Verificar que el usuario exista
        if (!user) {
            invalidCredentials('El usuario no existe');
        }

        // Verificar que el código de registro coincida
        if (user.registration_code !== registration_code) {
            invalidCredentials('Código de registro inválido');
        }

        // Obtenemos las nuevas contraseñas
        const { newPassword, repeatPassword } = body;
        console.log(`Nuevas contraseñas: ${newPassword}, ${repeatPassword}`);

        // Verificar que las dos contraseñas sean iguales
        if (newPassword !== repeatPassword) {
            invalidCredentials('Las contraseñas no coinciden');
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        console.log(`Contraseña encriptada: ${hashedPassword}`);

        // Actualizar la contraseña en la base de datos
        const response = await updatePasswordModel(user.id_user, hashedPassword);
        
        return response;
    } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorService(
        error,
        'UPDATE_PASSWORD_SERVICE_ERROR',
        'Error en el servicio al modificar contraseña'
      );
    }
};