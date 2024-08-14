import { getVisitSearchService } from '../../../services/Modules/visits/getVisitSearchService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getVisitSearchController = async (req, res, next) => {
  try {
    // Llamamos al servicio
    const response = await getVisitSearchService(req.query.searchTerm);

    res.status(200).json({
      status: 'ok',
      message: response.message,
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_visit_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de clientes con la busqueda'
    );
  }
};
