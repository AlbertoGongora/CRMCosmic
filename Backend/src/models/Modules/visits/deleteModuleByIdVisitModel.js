import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const deleteModuleByIdVisitModel = async (id_module) => {
  try {
    const pool = getDBPool();
    const [result] = await pool.query(
      `DELETE FROM Modules 
            WHERE id_module = ?`,
      [id_module]
    );

    if (result.affectedRows === 0) {
      databaseQueryError('No se ha podido eliminar la visita del modulo');
    }
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al eliminar la visita en el modelo'
    );
  }
};
