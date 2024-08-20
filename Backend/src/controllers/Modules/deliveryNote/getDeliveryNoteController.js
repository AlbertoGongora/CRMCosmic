import { getDeliveryNoteService } from '../../../services/Modules/deliveryNote/getDeliveryNoteService.js';
import { handleErrorController } from '../../../utils/handleError.js';

// Define el controlador para obtener notas de entrega
export const getDeliveryNotesController = async (req, res, next) => {
  try {
    // Recibir la lista de delivery notes
    const result = await getDeliveryNoteService();

    // Envía la respuesta con las notas de entrega
    res.status(200).send({
      status: 'ok',
      message: 'Delivery Notes',
      data: result,
    });
  } catch (error) {
    // Manejo de errores
    handleErrorController(
      error,
      next,
      'GET_DELIVERY_NOTES_CONTROLLER_ERROR',
      'Error en el controlador para obtener las notas de entrega'
    )
  }
};
