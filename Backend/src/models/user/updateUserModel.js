import { getDBPool } from '../../db/getPool.js';
import { databaseUpdateError } from '../../services/error/errorDataBase.js';

export const updateUserModel = async (
  userId,
  name,
  last_name,
  email,
  phone,
  bio
) => {
  try {
    const pool = await getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    addToUpdate('name', name);
    addToUpdate('last_name', last_name);
    addToUpdate('email', email);
    addToUpdate('phone', phone);
    addToUpdate('biography', bio);

    if (fieldsToUpdate.length === 0) {
      return null; // No hay campos para actualizar
    }

    const query = `UPDATE Users SET ${fieldsToUpdate.join(', ')} WHERE id_user = ?`;
    values.push(userId);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseUpdateError('No se ha podido actualizar el usuario.');
    }

    return result;
  } catch (error) {
    databaseUpdateError(error.message || 'Error en el modelo al actualizar usuario');
  }
};
