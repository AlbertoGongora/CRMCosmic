import { controllerError } from "../../services/error/errorServer.js";
import { getUserSearchService } from "../../services/user/getUserSearchService.js";

export const getUserSearchController = async (req, res, next) => {
    try {
        // Recibimos la cadena completa desde la consulta
        const searchTerm = req.query.searchTerm;

        // Llamamos al servicio
        const response = await getUserSearchService(searchTerm);

        res.status(200).json({
            status: 'ok',
            message: 'Users',
            data: response
        })
    } catch (error) {
        next(controllerError(
            'GET_USER_LIST_CONTROLLER_ERROR', 
            error.message || 'Error en el controlador al obtener la lista de usuarios con la busqueda', 
            error.statusCode || 500
          )
        );
    }
}
