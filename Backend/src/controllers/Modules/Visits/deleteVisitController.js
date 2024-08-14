import { handleErrorController } from '../../../utils/handleError.js';
import { selectVisitService } from '../../../services/Modules/visits/selectVisitService.js';

export const deleteVisitController = async (req, res, next) => {
  try {
    const id_visit = req.params.visitId;

    await selectVisitService(id_visit);

    res.status(200).json({
      status: 'ok',
      message: 'La visita ha sido eliminada',
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
