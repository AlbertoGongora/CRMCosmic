import { getDBPool } from '../../../db/getPool.js';
import { databaseInsertError } from '../../../services/error/errorDataBase.js';

export const insertVisitModel = async (
  visitId,
  ref,
  id_user,
  customerId,
  visitDate,
  observations
) => {
  try {
    const pool = await getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };
    addToUpdate('id_visit', visitId);
    addToUpdate('ref_VT', ref);
    addToUpdate('user_id', id_user);
    addToUpdate('customer_id', customerId);
    addToUpdate('visit_date', visitDate);
    addToUpdate('observations', observations);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const query = `INSERT INTO Visits (id_visit, ref_VT, user_id, customer_id, visit_date, observations) VALUES (?, ?, ?, ?, ?, ?)`;
    values.push(id_user);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido insertar la visita');
    }
  } catch (error) {
    databaseInsertError(
      error.message || 'Error en el modelo al insertar la visita'
    );
  }
};
