import { getProductSearchService } from '../../services/product/getProductSearchService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const getProductSearchController = async (req, res, next) => {
  try {
    //Recibimos la cadena completa desde la consulta
    const searchTerm = req.query.searchTerm;

    //Llamanos al servivio
    const response = await getProductSearchService(searchTerm);

    res.status(200).json({
      status: 'ok',
      message: 'lista Productos',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SEARCH_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de productos con la busqueda'
    );
  }
};
