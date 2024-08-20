import { getDBPool } from '../../db/getPool.js';
import { databaseDeleteError } from '../../services/error/errorDataBase.js';

export const deleteModuleModel = async (moduleId) => {
  try {
    const pool = await getDBPool();

    // elimino del las tablas todos los pagos relacionados
    const [result] = await pool.query(
      'DELETE FROM Modules WHERE id_module = ?',
      [moduleId]
    );

    if (result.affectedRows === 0) {
      databaseDeleteError('No se ha podido eliminar el modulo');
    }
    return { message: 'Modulo eliminado correctamente' };
  } catch (error) {
    databaseDeleteError(
      error.message || 'Error en el modelo al eliminiar un modulo'
    );
  }
};
