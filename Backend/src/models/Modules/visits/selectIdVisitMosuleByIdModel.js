import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectIdVisitMosuleByIdModel = async (visitId) => {
  try {
    const pool = getDBPool();

    const [result] = await pool.query(
      `SELECT * FROM Modules WHERE visit_id = ?`,
      [visitId]
    );

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al obtener la visita del modulo'
    );
  }
};
