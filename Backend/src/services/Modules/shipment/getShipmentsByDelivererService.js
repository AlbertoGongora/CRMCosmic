import { getShipmentsByDelivererModel } from '../../../models/Modules/shipment/getShipmentsByDelivererModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getShipmentsByDelivererService = async () => {
  try {
    const shipments = await getShipmentsByDelivererModel();

    return shipments;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SHIPMENT_LIST_ASSIGN_DELIVERER_SERVICE_ERROR',
      'Error al obtener la lista de envios asosiados a los repartidores en el servicio'
    );
  }
};
