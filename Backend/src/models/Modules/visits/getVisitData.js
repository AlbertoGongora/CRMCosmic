import { getDBPool } from '../../../db/getPool.js';

export const getVisitData = async (visitId) => {
  try {
    const pool = await getDBPool();
    const [rows] = await pool.query(
      'SELECT user_id, customer_id, visit_date, observations FROM Visits WHERE id_visit = ?',
      [visitId]
    );
    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al obtener el usuario en el modelo de visitas'
    );
  }
};
