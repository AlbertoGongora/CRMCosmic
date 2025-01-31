import bcrypt from "bcrypt";
import { getMaxReference3Digits } from "../../models/getMaxReference.js";
import { selectUserByEmailModel } from "../../models/user/selectUserByEmailModel.js";
import { generateRandomPassword } from "../../utils/generateRandomPassword.js";
import { generateReference3DigitsFromRef } from "../../utils/generateReference3Digits.js";
import { sendWelcomeEmail } from "../email/emailService.js";
import { emailAlreadyRegisteredError } from "../error/errorService.js";
import { insertUserModel } from "../../models/user/insertUserModel.js";
import { handleErrorService } from "../../utils/handleError.js";


export const insertUserService = async (body) => {
  try {
    const { name, last_name, email, role } = body;

    // Buscamos en la base de datos algún usuario con ese email.
    const existUser = await selectUserByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existUser === null) {
      emailAlreadyRegisteredError();
    }

    // Creamos una id y un código de activación para el usuario.
    const id_user = crypto.randomUUID();
    const registration_code = crypto.randomUUID();
    const password = generateRandomPassword(10);
    const hashed_password = await bcrypt.hash(password, 12);

    // Obtenemos la referencia máxima de la tabla Users
    const maxRef = await getMaxReference3Digits('Users', 'ref_US');

    // Generamos la nueva referencia de Users
    const ref = generateReference3DigitsFromRef('US', 'U', maxRef);

    // Insertamos el usuario en la base de datos.
    await insertUserModel(
      id_user,
      ref,
      name,
      last_name,
      email,
      hashed_password,
      role,
      registration_code
    );

    // Enviar correo electrónico de bienvenida
    await sendWelcomeEmail(name, last_name, password, email, registration_code);
    
  } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorService(
      error,
      'INSERT_USER_SERVICE_ERROR',
      'Error en el servicio al insertar usuario'
    );
  }
};