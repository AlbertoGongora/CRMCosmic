import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const deleteVisitModel = async (visit_id) => {
  try {
    const pool = getDBPool();
    const [result] = await pool.query(
      `DELETE FROM Visits 
            WHERE id_visit = ?`,
      [visit_id]
    );

    if (result.affectedRows === 0) {
      databaseQueryError('No se ha podido eliminar la visita');
    }

    return { message: 'Visita eliminada correctamente' };
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al eliminar la visita en el modelo'
    );
  }
};
