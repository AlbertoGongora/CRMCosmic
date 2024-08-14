import { feedbackVisitModel } from '../../../models/Modules/visits/feedbackVisitModel.js';
import { selectIdVisitByIdFeedbackModel } from '../../../models/Modules/visits/selectIdVisitByIdFeedbackModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { invalidCredentials } from '../../error/errorService.js';
import { selectIdVisitMosuleByIdModel } from '../../../models/Modules/visits/selectIdVisitMosuleByIdModel.js';

export const feedbackVisitService = async (body, ref_VT) => {
  try {
    //Obtenemos el body la valoracion y el comentario
    const { rating_visit, comment_visit } = body;

    // Obtengo el id de la visita
    const feedbackVisit = await selectIdVisitByIdFeedbackModel(ref_VT);
    console.log(feedbackVisit);

    // Validamos que no exista una valoracion previa
    const feedbackModules = await selectIdVisitMosuleByIdModel(
      feedbackVisit.id_visit
    );
    console.log(feedbackModules);

    if (feedbackModules.rating_module !== null) {
      invalidCredentials('Ya has realizado una valoración para esta visita');
    }

    //Llamamos al servicio
    const response = await feedbackVisitModel(
      feedbackVisit.id_visit,
      rating_visit,
      comment_visit
    );

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'FEEDBACK_VISIT_SERVICE_ERROR',
      'Error en el servicio al obtener una valoración de una visita'
    );
  }
};
