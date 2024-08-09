import { getDBPool } from "../../db/getPool.js";
import { databaseDeleteError } from "../../services/error/errorDataBase.js";

export const deleteUserModel = async (id_user) => {
    try {
        const pool = await getDBPool();
        const [result] = await pool.query(
            `DELETE FROM Users WHERE id_user = ?`,
            [id_user]
        );
        if (result.affectedRows === 0) {
            databaseDeleteError();
        }
    } catch (error) {
        databaseDeleteError(error.message || 'Error en el modelo al eliminiar un usuario');
    }

}