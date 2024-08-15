import { getSalesSearchService } from '../../../services/Modules/sales/getSalesSearchService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getSalesSearchController = async (req, res, next) => {
  try {
    // Llamamos al servicio
    const response = await getSalesSearchService(req.query.searchTerm);

    res.status(200).json({
      status: 'ok',
      message: response.message,
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SALES_SEARCH_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de ventas con la busqueda'
    );
  }
};
