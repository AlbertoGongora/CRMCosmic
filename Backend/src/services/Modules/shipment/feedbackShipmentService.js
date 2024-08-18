import { updateFeedbackShipmentModel } from '../../../models/Modules/shipment/updateFeedbackShipmentModel.js';
import { selectShipmentByrefSHModel } from '../../../models/Modules/shipment/selectShipmentByTrackingNumberModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { checkFeedbackExistsModel } from '../../../models/Modules/shipment/checkFeedbackExistsModel.js';

export const feedbackShipmentService = async (body, ref_SH) => {
  try {
    const { rating_module, rating_comment } = body;

    // Obtener el id del envío por el número de referencia del envío
    const shipment = await selectShipmentByrefSHModel(ref_SH);

    console.log('Resultado de la consulta del número de referencia:', shipment);

    // Verificar si el envío ya tiene un feedback
    await checkFeedbackExistsModel(shipment.id_shipment);

    // Actualizar el feedback en la base de datos
    const response = await updateFeedbackShipmentModel(
      shipment.id_shipment,
      rating_module,
      rating_comment
    );

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SHIPMENT_FEEDBACK_SERVICE_ERROR',
      'Error al obtener la valoración en el servicio'
    );
  }
};
