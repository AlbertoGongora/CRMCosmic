import { handleErrorController } from '../../../utils/handleError.js';
import { selectVisitService } from '../../../services/Modules/visits/selectVisitService.js';

export const deleteVisitController = async (req, res, next) => {
  try {
    await selectVisitService(req.params.visitId);

    res.status(200).send({
      status: 'ok',
      message: 'La visita ha sido eliminada con exito',
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_VISIT_CONTROLLER_ERROR',
      'Error en el controlador al eliminar una visita'
    );
  }
};
