import { selectShipmentSearchModel } from '../../../models/Modules/shipment/selectShipmentSearchModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

// Función para buscar envíos
export const getShipmentSearchService = async (search) => {
  try {
    // Llamamos al modelo para buscar envíos
    const shipmentsData = await selectShipmentSearchModel(search);

    return shipmentsData;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SEARCH_SERVICE_ERROR',
      'Error al obtener la lista de busquedas de envios desde el servicio'
    );
  }
};
