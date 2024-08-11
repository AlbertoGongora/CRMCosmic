import { getDBPool } from "../../db/getPool.js";
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectIdByRegistrationCode = async (registration_code) => {
  try {
    const pool = await getDBPool();
    const [rows] = await pool.query(
      "SELECT id_user, registration_code FROM Users WHERE registration_code = ?",
      [registration_code]
    );

    if (rows.length === 0) {
      databaseQueryError('No se encontró ningún usuario con el código de registro proporcionado.');
    }

    return rows[0];
  } catch (error) {
    databaseQueryError(error.message || 'Error en el modelo al consultar id_user por código de registro');
  }
};
