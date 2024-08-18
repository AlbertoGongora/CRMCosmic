import { getModuleShipmentModel } from '../../../models/Modules/getModuleShipmentModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getModuleShipmentService = async () => {
  try {
    const shipments = await getModuleShipmentModel();

    return shipments;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SHIPMENT_LIST_SERVICE_ERROR',
      'Error al obtener la lista de envios desde el servicio'
    );
  }
};
