import { getUserSearchService } from "../../services/user/getUserSearchService.js";
import { handleErrorController } from "../../utils/handleError.js";

export const getUserSearchController = async (req, res, next) => {
    try {
        // Recibimos la cadena completa desde la consulta
        const searchTerm = req.query.searchTerm;

        // Llamamos al servicio
        const response = await getUserSearchService(searchTerm);

        // Devolvemos la respuesta de la peticion de busqueda
        res.status(200).json({
            status: 'ok',
            message: 'Users',
            data: response
        })
    } catch (error) {
    // Usamos la función modularizada para manejar el error
    handleErrorController(
        error,
        next,
        'GET_USER_LIST_CONTROLLER_ERROR',
        'Error en el controlador al obtener la lista de usuarios con la busqueda'
      );
    }
}
