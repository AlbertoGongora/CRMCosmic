import { selectIdVisitByIdFeedbackModel } from '../../../models/Modules/visits/selectIdVisitByIdFeedbackModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const feedbackVisitCheckService = async (ref_VT) => {
  try {
    // Obtengo el id de la visita
    const response = await selectIdVisitByIdFeedbackModel(ref_VT);

    return response[0];
  } catch (error) {
    handleErrorService(
      error,
      'GET_USER_LIST_SERVICE_ERROR',
      'Error al obtener el feedback desde el servicio'
    );
  }
};
