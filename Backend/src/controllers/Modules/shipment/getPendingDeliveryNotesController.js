import { getPendingDeliveryNotesService } from '../../../services/Modules/shipment/getPendingDeliveryNotesService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getPendingDeliveryNotesController = async (req, res, next) => {
  try {
    const pendingNotes = await getPendingDeliveryNotesService();
    res.status(200).send({
      status: 'ok',
      data: pendingNotes,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_PENDING_DELEVERY_NOTE_CONTROLLER_ERROR',
      'Error en el controlador al obtener los albaranes pendientes de envío'
    );
  }
};
