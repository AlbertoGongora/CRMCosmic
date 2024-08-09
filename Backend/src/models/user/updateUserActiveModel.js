import { getDBPool } from '../../db/getPool.js';
import { databaseUpdateError } from '../../services/error/errorDataBase.js';

export const updateUserActiveModel = async (id_user) => {
    try {
        const dbPool = getDBPool();
        const query = `UPDATE Users SET active = true WHERE id_user = ?`;
        const values = [id_user];
        const [result] = await dbPool.query(query, values);

        if (result.affectedRows === 0) {
            databaseUpdateError();
        }

        return result;
    } catch (error) {
        databaseUpdateError(error.message || 'Error en la activacion del usuario')
    }

}