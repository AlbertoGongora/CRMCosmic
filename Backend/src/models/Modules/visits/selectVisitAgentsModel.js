import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectVisitAgentsModel = async () => {
  try {
    const pool = getDBPool();
    const query = `
      SELECT 
        id_user, 
        ref_US, 
        name, 
        last_name, 
        email, 
        phone, 
        address_id, 
        avatar, 
        active 
      FROM Users
      WHERE role = 'salesAgent' AND active = true
    `;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    databaseQueryError(
      error.message || 'Error al obtener el comercial desde el modelo'
    );
  }
};
