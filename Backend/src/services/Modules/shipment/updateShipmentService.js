import { updateShipmentModel } from '../../../models/Modules/shipment/updateShipmentModel.js';
import { selectShipmentDataModel } from '../../../models/Modules/shipment/selectShipmentDataModel.js';
import { updateStatusModel } from '../../../models/updateStatusModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const updateShipmentService = async (shipmentId, body) => {
  try {
    const { shipment_status } = body;

    // Actualizar el envío en la base de datos.
    await updateShipmentModel(shipmentId, shipment_status);

    // Obtener el envío actualizado.
    const shipment = await selectShipmentDataModel(shipmentId);

    // Si el estado del envío es 'delayed', 'cancelled' o 'refused', actualizar el estado en DeliveryNotes a 'incidence'.
    if (['delayed', 'cancelled', 'refused'].includes(shipment_status)) {
      await updateStatusModel(
        'DeliveryNotes',
        'delivery_status',
        'id_note',
        'incidence',
        shipment.deliveryNote_id
      );
    }

    // Devolver el envío actualizado.
    return shipment;
  } catch (error) {
    handleErrorService(
      error,
      'UPDATE_CUSTOMER_SERVICE_ERROR',
      'Error al actulizar el envio desde el servicio'
    );
  }
};
