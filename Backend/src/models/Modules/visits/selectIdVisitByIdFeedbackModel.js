import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectIdVisitByIdFeedbackModel = async (ref_VT) => {
  try {
    const pool = getDBPool();

    const [result] = await pool.query(`SELECT * FROM Visits WHERE ref_VT = ?`, [
      ref_VT,
    ]);

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al obtener el feedback de la visita en el modelo'
    );
  }
};
