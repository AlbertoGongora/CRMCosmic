import { getDBPool } from '../../db/getPool.js';
import { databaseInsertError } from '../../services/error/errorDataBase.js';

export const insertUserModel = async (
  id_user, 
  ref,
  name, 
  last_name, 
  email, 
  password, 
  role,
  registration_code
) => {
  try {
    const pool = await getDBPool();

    // Insertamos el usuario en la base de datos.
    const [result] = await pool.query(
      `INSERT INTO Users (id_user, ref_US, name, last_name, email, password, role, registration_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_user, ref, name, last_name, email, password, role, registration_code]
    );

    // Verificar si el insert afectó a alguna línea.
    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido insertar el usuario');
    }
  } catch (error) {
    databaseInsertError(error.message || 'Error en el modelo al insertar usuario');
  }
};