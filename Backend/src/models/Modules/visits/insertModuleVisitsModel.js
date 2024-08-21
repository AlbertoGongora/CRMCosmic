import { getDBPool } from '../../../db/getPool.js';

export const insertModuleVisitsModel = async (
  moduleId,
  refModule,
  id_user,
  service_type,
  visitId
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
    addToUpdate('id_module', moduleId);
    addToUpdate('ref_MD', refModule);
    addToUpdate('agentUser_id', id_user);
    addToUpdate('service_type', service_type);
    addToUpdate('visit_id', visitId);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const fieldsString = fieldsToUpdate.join(', ');

    const query = `INSERT INTO Modules SET ${fieldsString}`;
    values.push(visitId);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido insertar la visita en el modulo');
    }
  } catch (error) {
    databaseInsertError(
      error.message || 'Error en el modelo al insertar la visita en el modulo'
    );
  }
};
