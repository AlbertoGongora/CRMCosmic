import { getDBPool } from '../../db/getPool.js';
import { databaseUpdateError } from '../../services/error/errorDataBase.js';

export const updatePasswordModel = async (id_user, hashedPassword) => {
  try {
    const pool = getDBPool();
    const query = `
      UPDATE Users
      SET password = ?
      WHERE id_user = ?
    `;

    const [result] = await pool.execute(query, [hashedPassword, id_user]);

    if (result.affectedRows === 0) {
      databaseUpdateError('No se ha podido actualizar la contraseña.');
    }

    return { message: 'Contraseña actualizada correctamente' };
  } catch (error) {
    databaseUpdateError(error.message || 'Error en el modelo al actualizar la contraseña');
  }
};
