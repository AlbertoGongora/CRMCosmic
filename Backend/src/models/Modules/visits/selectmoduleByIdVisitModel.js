import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectmoduleByIdVisitModel = async (id_visit) => {
  try {
    const pool = await getDBPool();
    const [rows] = await pool.query(
      'SELECT * FROM Modules WHERE visit_id = ?',
      [id_visit]
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en modelo al obtener la visita de el modulo'
    );
  }
};
