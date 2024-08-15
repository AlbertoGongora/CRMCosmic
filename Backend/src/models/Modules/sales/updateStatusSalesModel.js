import { getDBPool } from '../../../db/getPool.js';
import { databaseUpdateError } from '../../../services/error/errorDataBase.js';

export const updateStatusSalesModel = async (id, newStatus) => {
  try {
    const pool = await getDBPool();

    const [result] = await pool.query(
      `UPDATE Sales SET operation_status = ? WHERE id_sale = ?`,
      [newStatus, id]
    );

    // Verificar si la actualización afectó alguna fila
    if (result.affectedRows === 0) {
      databaseUpdateError('No se ha podido actualizar el estado de la venta.');
    }

    return result;
  } catch (error) {
    databaseUpdateError('Error al actualizar el estado de la venta en la base de datos');
  }
};
