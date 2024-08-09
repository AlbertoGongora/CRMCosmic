import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';
import { notFoundError, userAlreadyActivatedError } from '../../services/error/errorService.js';

export const findByRegistrationCodeModel = async (registration_code) => {
    try {
        const pool = await getDBPool();
        // Buscar el usuario en la base de datos.
        const [users] = await pool.query(
            `SELECT id_user, active FROM Users WHERE registration_code = ?`,
            [registration_code]
        );
    
        // Si no se encuentra el usuario, lanzar un error.
        if (users.length === 0) {
            notFoundError('usuario');
        }
    
        // Si existe el usuario, comprobar si está activo.
        if (users[0].active) {
            userAlreadyActivatedError();
        }
    
        // Devolver el usuario.
        return users[0];
    } catch (error) {
        databaseQueryError(error.message || 'Error al obtener el codigo de registro del usuario')
    }

};