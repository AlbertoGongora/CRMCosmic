import { selectDeliveryNoteService } from '../../../services/Modules/deliveryNote/selectDeliveryNoteService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const deleteDeliveryNoteController = async (req, res, next) => {
  try {
    // Eliminamos el albarán de la base de datos.
    await selectDeliveryNoteService(req.params.deliveryNote_id);

    // Respondemos al albarán.
    res
      .status(200)
      .send({ message: 'Nota de entrega eliminada correctamente' });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_DELIVERY_NOTE_CONTROLLER_ERROR',
      'Error en el controlador al eliminar una nota de entrega'
    );
  }
};
