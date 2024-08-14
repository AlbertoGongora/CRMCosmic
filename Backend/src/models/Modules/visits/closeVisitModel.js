import { getDBPool } from '../../../db/getPool.js';
import { databaseUpdateError } from '../../../services/error/errorDataBase.js';

export const updateVisitStatusModel = async (visitId, newStatus) => {
  try {
    const pool = await getDBPool();

    await pool.query(
      `UPDATE Visits SET visit_status = ?, update_at = NOW() WHERE id_visit = ?`,
      [newStatus, visitId]
    );
  } catch (error) {
    databaseUpdateError(
      error.message || 'Error en el modelo al cambiar el estado de una visita'
    );
  }
};
