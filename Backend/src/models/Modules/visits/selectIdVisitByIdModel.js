import { getDBPool } from '../../../db/getPool.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const selectIdVisitByIdModel = async (visitId) => {
  try {
    const pool = getDBPool();

    const [result] = await pool.query(
      `SELECT * FROM Visits WHERE id_visit = ?`,
      [visitId]
    );

    return result[0];
  } catch (error) {
    handleErrorService(
      error,
      'SELECT_VISIT_SERVICE_ERROR',
      'Error al selecionar una visita'
    );
  }
};
