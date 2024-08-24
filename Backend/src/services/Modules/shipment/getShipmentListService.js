import { getShipmentListModel } from '../../../models/Modules/shipment/getShipmentListModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getShipmentListService = async () => {
  try {
    const shipments = await getShipmentListModel();

    return shipments;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SHIPMENT_LIST_SERVICE_ERROR',
      'Error al obtener la lista de envios desde el servicio'
    );
  }
};
