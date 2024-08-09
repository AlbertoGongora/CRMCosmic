import { getDBPool } from "../../db/getPool.js";
import { databaseQueryError } from "../../services/error/errorDataBase.js";

export const selectUserByEmailModel = async (email) => {
  try {
    const pool = await getDBPool();

    // Obtener el usuario con ese email.
    const [user] = await pool.query(
      `SELECT * FROM Users WHERE email = ?`,
      [email]
    );

    // Verificar si se encontró el usuario.
    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    databaseQueryError(error.message || 'Error en el modelo al seleccionar usuario por email');
  }
};
