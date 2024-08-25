import { getCustomerSearchService } from '../../services/customer/getCustomerSearchServices.js';
import { handleErrorController } from '../../utils/handleError.js';

export const getCustomerSearchController = async (req, res, next) => {
  try {
    // Llamamos al servicio
    const customers = await getCustomerSearchService(req.query.searchTerm);
    res.status(200).send({
      status: 'ok',
      data: customers,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SEARCH_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de clientes con la busqueda'
    );
  }
};
