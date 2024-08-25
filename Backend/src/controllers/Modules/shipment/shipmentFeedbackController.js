import { feedbackShipmentSchema } from '../../../schemas/Modules/shipment/updateShipmentSchema.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { feedbackShipmentService } from '../../../services/Modules/shipment/feedbackShipmentService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const shipmentFeedbackController = async (req, res, next) => {
  try {
    // Validar los datos del request body
    await validateSchemaUtil(feedbackShipmentSchema, req.body);

    // Llamar al servicio de feedback
    const response = await feedbackShipmentService(req.body, req.params.ref_SH);

    res.status(200).send({
      status: 'ok',
      message: response.message,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SHIPMENT_FEEDBACK_CONTROLLER_ERROR',
      'Error en el controlador al obtener el valoración del envío'
    );
  }
};
