import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const feedbackVisitModel = async (
  id_visit,
  rating_visit,
  comment_visit
) => {
  try {
    const pool = await getDBPool();

    //insertamos el rating y comentario en la base de datos del la id de la visita
    const [result] = await pool.query(
      'UPDATE Modules SET rating_module = ?, rating_comment = ? WHERE visit_id = ?',
      [rating_visit, comment_visit, id_visit]
    );
    if (result.affectedRows === 0) {
      const error = new Error(
        'No se ha podido insertar el feedback de la visita'
      );
      error.code = 'FEEDBACK_VISIT_ERROR';
      throw error;
    }

    return { message: 'Valoración de la visita insertado correctamente' };
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al insertar el feedback de la visita'
    );
  }
};
