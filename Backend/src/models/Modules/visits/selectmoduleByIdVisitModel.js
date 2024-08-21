import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectmoduleByIdVisitModel = async (visitId) => {
  try {
    const pool = await getDBPool();
    const [rows] = await pool.query(
      'SELECT * FROM Modules WHERE visit_id = ?',
      [visitId]
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en modelo al obtener la visita de el modulo'
    );
  }
};
