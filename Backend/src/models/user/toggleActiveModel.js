import { getDBPool } from '../../db/getPool.js';
import { databaseUpdateError } from '../../services/error/errorDataBase.js';

export const toggleActiveModel = async (id_user, value) => {
    try {
        const dbPool = getDBPool();
        const query = `UPDATE Users SET active = ? WHERE id_user = ?`;
        const values = [value, id_user];
        const [result] = await dbPool.query(query, values);

        if (result.affectedRows === 0) {
            databaseUpdateError('No se ha podido actualizar el estado del usuario');
          }          

        return result;
    } catch (error) {
        databaseUpdateError(error.message || 'Error en el modelo al cambiar el estado del usuario');
        }
};