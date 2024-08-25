import { checkFeedbackExistsService } from '../../../services/Modules/shipment/checkFeedbackExistsService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const checkFeedbackController = async (req, res, next) => {
  try {
    const feedbackExists = await checkFeedbackExistsService(
      req.params.ref_SH,
      shipment.id_shipment
    );

    res.status(200).send({ feedbackExists });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CHECK_FEEDBACK_CONTROLLER_ERROR',
      'Error en el controlador al verificar si la valoración existe '
    );
  }
};
