import { notFoundError } from '../../error/errorService.js';
import { updateStatusModel } from '../../../models/updateStatusModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { updateShipmentModel } from '../../../models/Modules/shipment/updateShipmentModel.js';
import { selectShipmentByIdModel } from '../../../models/Modules/shipment/selectShipmentByIdModel.js';
import { selectShipmentDataByIdModel } from '../../../models/Modules/shipment/selectShipmentDataByIdModel.js';

export const updateShipmentService = async (shipmentId, shipment_status) => {
  try {
    // Verificar si el envío existe en la base de datos.
   const shipmentDB = await selectShipmentByIdModel(shipmentId);

   // Si no se encuentra el envio, lanzar un error.
   if (!shipmentDB) {
     notFoundError('Shipment');
   }

    // Actualizar el envío en la base de datos.
    await updateShipmentModel(shipmentId, shipment_status);

    // Obtener el envío actualizado.
    const shipmentData = await selectShipmentDataByIdModel(shipmentId);

    // Si el estado del envío es 'delayed', 'cancelled' o 'refused', actualizar el estado en DeliveryNotes a 'incidence'.
    if (['delayed', 'cancelled', 'refused'].includes(shipment_status)) {
      await updateStatusModel(
        'DeliveryNotes',
        'delivery_status',
        'id_note',
        'incidence',
        shipmentData.deliveryNote_id
      );
    }

    // Devolver el envío actualizado.
    return shipmentData;
  } catch (error) {
    handleErrorService(
      error,
      'UPDATE_SHIPMENT_SERVICE_ERROR',
      'Error al actulizar el envio desde el servicio'
    );
  }
};