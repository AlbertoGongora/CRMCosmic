import { getDBPool } from "../../../db/getPool.js";
import { databaseQueryError } from "../../../services/error/errorDataBase.js";
import { notFoundError } from "../../../services/error/errorService.js";

export const getDeliverersModel = async () => {
  try {
    const pool = await getDBPool();
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
      WHERE role = 'deliverer' AND active = true
    `;
    const [rows] = await pool.query(query);

    // Verificación de resultados
    if (!rows || rows.length === 0) {
      notFoundError('Deliverers');
    }

    return rows;
  } catch (error) {
    databaseQueryError(error.message || 'Error al obtener la lista de repartidores');
  }
};