import { getDBPool } from '../../db/getPool.js';

export const selectUserByIdModel = async (id_user) => {
  try {
    const pool = await getDBPool();

    // Obtener el usuario con ese id.
    const [users] = await pool.query(
      `SELECT * FROM Users WHERE id_user = ?`,
      [id_user]
    );

    if (users.length === 0) {
      throw {
        statusCode: 404,
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado',
      };
    }

    return users[0];
  } catch (error) {
    console.error('Error al obtener el usuario desde el modelo:', error);
    throw internalServerError(error.message || 'Error al obtener el usuario desde el modelo');
  }
};