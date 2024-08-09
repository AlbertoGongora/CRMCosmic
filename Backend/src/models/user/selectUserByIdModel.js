import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';
import { notFoundError } from '../../services/error/errorService.js';  // Asegúrate de importar el error correcto

export const selectUserByIdModel = async (id_user) => {
  try {
    const pool = await getDBPool();

    // Obtener el usuario con ese id.
    const [users] = await pool.query(
      `SELECT * FROM Users WHERE id_user = ?`,
      [id_user]
    );

    // Verificar si se encontró el usuario.
    if (users.length === 0) {
      notFoundError('Usuario');
    }

    return users[0];
  } catch (error) {
    databaseQueryError(error.message || 'Error al obtener el usuario en el modelo');
  }
};
