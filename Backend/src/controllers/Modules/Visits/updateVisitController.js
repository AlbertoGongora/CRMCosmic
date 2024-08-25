import {
  updateVisitIDSchema,
  updateVisitSchema,
} from '../../../schemas/Modules/visits/visitSchema.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { updateVisitService } from '../../../services/Modules/visits/updateVisitService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const updateVisitController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateVisitSchema, req.body);

    // Validamos el id que recibimos por params
    await validateSchemaUtil(updateVisitIDSchema, req.params);

    // Obtenemos el id de la visita
    const visitId = req.params.visitId;

    // Llamamos al servicio de actualización de visita
    const response = await updateVisitService(visitId, req.body);

    res.status(200).send({
      status: 'ok',
      message: response.message,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'UPDATE_VISIT_CONTROLLER_ERROR',
      'Error en el controlador al modificar un usuario'
    );
  }
};
