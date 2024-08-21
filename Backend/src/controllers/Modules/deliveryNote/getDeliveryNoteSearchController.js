import { getDeliveryNoteSearchService } from '../../../services/Modules/deliveryNote/getDeliveryNoteSearchService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getDeliveryNoteSearchController = async (req, res, next) => {
  try {
    // Llamamos al servicio y obtenemos el albaran
    const response = await getDeliveryNoteSearchService(req.query.searchTerm);

    res.status(200).json({
      status: 'ok',
      message: 'Delivery Notes',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_DELIVERY_NOTE_SEARCH_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de albaranes con la busqueda'
    )
  }
};
