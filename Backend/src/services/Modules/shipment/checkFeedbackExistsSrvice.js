import { checkFeedbackExistsModel } from '../../../models/Modules/shipment/checkFeedbackExistsModel.js';
import { selectShipmentByrefSHModel } from '../../../models/Modules/shipment/selectShipmentByTrackingNumberModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { notFoundError } from '../../error/errorService.js';

export const checkFeedbackExistsSrvice = async (ref_SH, id_shipment) => {
  try {
    const shipment = await selectShipmentByrefSHModel(ref_SH);

    if (!shipment) {
      notFoundError('Envío no encontrado');
    }

    const response = await checkFeedbackExistsModel(id_shipment);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'CHECK_FEEDBACK_SERVICE_ERROR',
      'Error al verificar si la valoración existe la desde el servicio'
    );
  }
};
