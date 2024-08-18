import { selectShipmentSearchModel } from '../../../models/Modules/shipment/selectShipmentSearchModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

// Función para buscar envíos
export const getShipmentSearchService = async (search) => {
  try {
    // Llamamos al modelo para buscar envíos
    const shipments = await selectShipmentSearchModel(search);

    return shipments;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SEARCH_SERVICE_ERROR',
      'Error al obtener la lista de busquedas de envios desde el servicio'
    );
  }
};
