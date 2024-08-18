import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const checkFeedbackExistsModel = async (id_shipment) => {
  try {
    const pool = await getDBPool();
    const [rows] = await pool.query(
      'SELECT rating_module FROM Modules WHERE shipment_id = ?',
      [id_shipment]
    );
    return rows.length > 0 && rows[0].rating_module !== null;
  } catch (error) {
    databaseQueryError(
      error.message ||
        'Error al seleccionar la valoración del modulo desde el modelo'
    );
  }
};
