import { selectUserByEmailModel } from '../../models/user/selectUserByEmailModel.js';
import { selectUserByIdModel } from '../../models/user/selectUserByIdModel.js';
import { updateUserModel } from '../../models/user/updateUserModel.js';
import { internalServerError } from '../error/errorServer.js';
import { emailAlreadyRegisteredError } from '../error/errorService.js';

export const updateUserService = async (userId, body) => {
  try {
    // Extraemos los parametro del body
    const { name, last_name, email, phone, bio } = body;

    // Comprobar si el email ya existe.
    const existUser = await selectUserByEmailModel(email);
    if (existUser && existUser.id !== userId) {
      emailAlreadyRegisteredError();
    }
  
    // Actualizar el usuario en la base de datos.
    await updateUserModel(userId, name, last_name, email, phone, bio);
  
    // Obtener el usuario actualizado.
    const user = await selectUserByIdModel(userId);
  
    // Devolver el usuario actualizado.
    return user; 
  } catch (error) {
    if (!error.statusCode) {
      internalServerError(
        error.message || 'Error al modificar un usuario en el servicio'
      );
    }
    throw error;
  }
};
