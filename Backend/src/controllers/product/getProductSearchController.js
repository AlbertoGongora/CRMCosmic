import { getProductSearchService } from '../../services/product/getProductSearchService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const getProductSearchController = async (req, res, next) => {
  try {
    //Llamanos al servivio
    const response = await getProductSearchService(req.query.searchTerm);

    res.status(200).send({
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
