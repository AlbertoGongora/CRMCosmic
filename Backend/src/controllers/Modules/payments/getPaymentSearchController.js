import { getPaymentSearchService } from '../../../services/Modules/payments/getPaymentSearchService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getPaymentSearchController = async (req, res, next) => {
  try {
    // Llamamos al servicio
    const response = await getPaymentSearchService(req.query.searchTerm);

    res.status(200).send({
      status: 'ok',
      message: 'Datos de la busqueda',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_PAYMENT_SEARCH_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de pagos con la busqueda'
    );
  }
};
