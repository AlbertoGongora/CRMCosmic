import { selectPendingDeliveryNotesModel } from '../../../models/Modules/shipment/selectPendingDeliveryNotesModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getPendingDeliveryNotesService = async () => {
  try {
    const response = await selectPendingDeliveryNotesModel();

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'GET_PENDING_DELEVERY_NOTE_SERVICE_ERROR',
      'Error al obtener los albaranes pendientes de envio desde el servicio'
    );
  }
};
