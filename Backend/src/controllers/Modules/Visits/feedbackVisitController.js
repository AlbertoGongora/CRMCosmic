import { feedbackVisitSchema } from '../../../schemas/Modules/visits/visitSchema.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { feedbackVisitService } from '../../../services/Modules/visits/feedbackVisitService.js';
import { handleErrorController } from '../../../utils/handleError.js';
import { feedbackVisitCheckService } from '../../../services/Modules/visits/feedbackVisitChekService.js';

export const feedbackVisitController = async (req, res, next) => {
  try {
    // validamos con el joi
    await validateSchemaUtil(feedbackVisitSchema, req.body);

    const ref_VT = req.params.ref_VT;

    // Llamamos al servicio
    const response = await feedbackVisitService(req.body, ref_VT);

    // Obtengo la visita
    const visit = await feedbackVisitCheckService(ref_VT);

    res.status(200).send({
      status: 'ok',
      message: response.message,
      data: { visit },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'FEEDBACK_VISIT_CONTROLLER_ERROR',
      'Error en el controlador al obtener el feedback de una visita'
    );
  }
};
