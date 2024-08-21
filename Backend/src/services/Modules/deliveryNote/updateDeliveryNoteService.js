import { updateDeliveryNoteModel } from '../../../models/Modules/deliveryNote/updateDeliveryNoteModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { notFoundError } from '../../error/errorService.js';

export const updateDeliveryNoteService = async (deliveryNote_id, body) => {
  try {
    // Extraigo el estado que recibo
    const { delivery_status } = body;

    // Compruebo que existe
    const existDelivery = await selectDeliveryNoteByIdModel(deliveryNote_id);
    if (!existDelivery) {
      notFoundError('Delivery_Note');
    }

    // Inserta el nuevo estado en la base de datos
    await updateDeliveryNoteModel(deliveryNote_id, delivery_status);
  } catch (error) {
    handleErrorService(
      error,
      'UPDATE_DELIVERY_NOTE_SERVICE_ERROR',
      'Error al actualizar el estado de la nota de entrega'
    )
  }
};
