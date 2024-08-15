import { getDBPool } from '../../../db/getPool.js';
import { databaseInsertError } from '../../../services/error/errorDataBase.js';

export const insertModuleSalesModel = async (moduleId, refModule, id_user, service_type, id_sale) => {
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
    addToUpdate('sale_id', id_sale);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const fieldsString = fieldsToUpdate.join(', ');
    const query = `INSERT INTO Modules SET ${fieldsString}`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido insertar el módulo de ventas');
    }

    return { message: 'Módulo de ventas insertado correctamente' };
  } catch (error) {
    databaseInsertError(error.message || 'Error al insertar el módulo de ventas en la base de datos');
  }
};
