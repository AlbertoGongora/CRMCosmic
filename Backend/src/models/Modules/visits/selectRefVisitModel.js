import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectRefVisitModel = async (visitId) => {
  try {
    const pool = await getDBPool();

    const [rows] = await pool.query(
      'SELECT ref_VT FROM Visits WHERE id_visit = ?',
      [visitId]
    );
    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        'Error al obtener la referencia de la visita en el modelo'
    );
  }
};
