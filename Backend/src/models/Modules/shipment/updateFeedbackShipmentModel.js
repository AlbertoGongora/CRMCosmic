import { getDBPool } from '../../../db/getPool.js';

export const updateFeedbackShipmentModel = async (
  id_shipment,
  rating_module,
  rating_comment
) => {
  try {
    const pool = await getDBPool();

    // Actualizar el rating y comentario en la base de datos del envío
    const [updateResult] = await pool.query(
      'UPDATE Modules SET rating_module = ?, rating_comment = ? WHERE shipment_id = ?',
      [rating_module, rating_comment, id_shipment]
    );

    if (updateResult.affectedRows === 0) {
      databaseQueryError(
        'No se ha podido actualizar el feedback del envío. El registro no existe.'
      );
    }

    return { message: 'Valoración del envío actualizada correctamente' };
  } catch (error) {
    databaseQueryError(
      error.message ||
        'Error al actualizar la valoración de el envío desde el modelo'
    );
  }
};
