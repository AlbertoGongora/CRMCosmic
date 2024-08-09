import { getDBPool } from "../../db/getPool.js";
import { databaseQueryError } from "../../services/error/errorDataBase.js";

export const selectUserSearchModel = async (search) => {
    try {
        const pool = getDBPool();
    
        const [rows] = await pool.query(
            "SELECT * FROM Users WHERE name LIKE? OR last_name LIKE?",
            [`%${search}%`, `%${search}%`]
        );
    
        return rows;
        
    } catch (error) {
        databaseQueryError(error.message || 'Error al obtener la lista de busquedas de usuarios desde el modelo');        
    }
}
