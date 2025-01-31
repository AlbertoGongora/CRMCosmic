import { deleteDeliveryNoteModel } from '../../../models/Modules/deliveryNote/deleteDeliveryNoteModel.js';
import { selectSaleByIdModel } from '../../../models/Modules/sales/selectSaleByIdModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { selectShipmentByIdNoteModel } from '../../../models/Modules/shipment/selectShipmentByIdNoteModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { errorDeleteNoteHasShipment, invalidCredentials } from '../../error/errorService.js';

export const selectDeliveryNoteService = async (id_note) => {
  try {
     // Compruebo que existe y está cancelado
    const deliveryNote = await selectDeliveryNoteByIdModel(id_note);

    // Verifica si el albarán existe
    if (!deliveryNote || deliveryNote.id_note !== id_note) {
      invalidCredentials('El albarán no existe');
    }

    const shipment = await selectShipmentByIdNoteModel(id_note);

    // Verifica si el albarán está asociado a un envío
    if (shipment) {
      if (deliveryNote.delivery_status !== 'cancelled') {
        errorDeleteNoteHasShipment();
      }
    }

    // Verifica si el albarán está cancelado
    if (deliveryNote.delivery_status !== 'cancelled') {
      invalidCredentials('El albarán no está cancelado');
    }

    // Eliminar el albarán de la base de datos.
    await deleteDeliveryNoteModel(id_note);
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_DELIVERY_NOTE_SERVICE_ERROR',
      'Error en el servicio al borrar un albarán'
    )
  }
}
 
