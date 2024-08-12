import bcrypt from 'bcrypt';
import { selectUserByEmailModel } from "../../models/user/selectUserByEmailModel.js";
import { generateAccessToken } from "../../utils/generateAccessToken.js";
import { AccountInactiveError, invalidCredentials, invalidPasswordError } from "../error/errorService.js";
import { validateSignInRequest } from "./validateSignInRequest.js";
import { handleErrorService } from '../../utils/handleError.js';


export const loginUserService = async (body) => {
    try {
        //Validar los datos de entrada
        const { email, password, remember } = validateSignInRequest(body);

        //obtener el usuario
        const user = await selectUserByEmailModel(email);

        //validar el usuario
        if (!user){
            invalidCredentials('El usuario/email no existe');
        }

        //validar el estado
        if (user.active != 1) {
            AccountInactiveError(); 
        }

        //comparar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);

        //validar la contraseña
        if (!isValidPassword) {
            invalidPasswordError();
        }
        // El usuario existe y la contraseña es correcta
        //Login exitoso
        const token = generateAccessToken(user);

        return { token, user };
    } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorService(
        error,
        'LOGIN_USER_SERVICE_ERROR',
        'Error en el servicio al realizar login del usuario'
      );
    }
};