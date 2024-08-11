import { getDBPool } from "../../db/getPool.js";
import { databaseUpdateError } from '../../services/error/errorDataBase.js';

export const updateNewRegistrationCodeModel = async (id_user, new_registration_code) => {
  try {
    const pool = getDBPool();
    const query = `UPDATE Users SET registration_code = ? WHERE id_user = ?`;
    const values = [new_registration_code, id_user];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseUpdateError('No se ha podido actualizar el código de registro.');
    }

    return result;
  } catch (error) {
    databaseUpdateError(error.message || 'Error en el modelo al actualizar el código de registro');
  }
};
