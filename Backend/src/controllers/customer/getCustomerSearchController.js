import { getCustomerSearchService } from '../../services/customer/getCustomerSearchServices.js';
import { controllerError } from '../../services/error/errorServer.js';

export const getCustomerSearchController = async (req, res, next) => {
  try {
    // Recibimos la cadena completa desde la consulta
    const searchTerm = req.query.searchTerm;

    // Llamamos al servicio
    const customers = await getCustomerSearchService(searchTerm);
    res.status(200).send({
      status: 'ok',
      data: customers,
    });
  } catch (error) {
    next(
      controllerError(
        'GET_USER_LIST_CONTROLLER_ERROR',
        error.message ||
          'Error en el controlador al obtener la lista de clientes con la busqueda',
        error.statusCode || 500
      )
    );
  }
};
