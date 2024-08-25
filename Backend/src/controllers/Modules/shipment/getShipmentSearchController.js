import { getShipmentSearchService } from '../../../services/Modules/shipment/getShipmentSearchService.js';
import { handleErrorController } from '../../../utils/handleError.js';

// Controlador para buscar envíos
export const getShipmentSearchController = async (req, res, next) => {
  try {
    // Llamamos al servicio para buscar envíos
    const response = await getShipmentSearchService(req.query.searchTerm);

    // Devolvemos la respuesta
    res.status(200).send({
      status: 'ok',
      message: 'Busqueda de envios con exito',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SHIPMENT_SEARCH_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de envios con la busqueda'
    );
  }
};
