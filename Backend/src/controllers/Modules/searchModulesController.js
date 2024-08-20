import { searchModulesService } from '../../services/Modules/visits/searchModulesService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const searchModulesController = async (req, res, next) => {
  try {
    // Obtengo el rol del usuario
    const userRole = req.user?.role;
    const searchTerm = req.query.search;

    const response = await searchModulesService(userRole, searchTerm);

    // Responder con los modulos
    res.status(200).send({
      status: 'ok',
      message: 'Detalle de los modulos',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SEARCH_MODULE_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de modulos con la busqueda'
    );
  }
};
