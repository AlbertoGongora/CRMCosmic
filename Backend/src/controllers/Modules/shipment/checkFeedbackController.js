import { checkFeedbackExistsSrvice } from '../../../services/Modules/shipment/checkFeedbackExistsSrvice.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const checkFeedbackController = async (req, res, next) => {
  try {
    const feedbackExists = await checkFeedbackExistsSrvice(
      req.params.ref_SH,
      shipment.id_shipment
    );

    res.status(200).json({ feedbackExists });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CHECK_FEEDBACK_CONTROLLER_ERROR',
      'Error en el controlador al verificar si la valoración existe '
    );
  }
};
