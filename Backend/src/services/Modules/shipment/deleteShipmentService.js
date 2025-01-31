import { deleteShipmentModel } from '../../../models/Modules/shipment/deleteShipmentModel.js';
import { updateModulesByShipmentIdModel } from '../../../models/Modules/shipment/deleteModulesByShipmentIdModel.js';
import { errorDeleteShipmentNotCancelledNote, notFoundError } from '../../error/errorService.js';
import { selectShipmentByIdShipmentModel } from '../../../models/Modules/shipment/selectShipmentByIdShipmentModel.js';
import { selectDeliveryNoteByIdShipmentModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdShipmentModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { selectShipmentByIdModel } from '../../../models/Modules/shipment/selectShipmentByIdModel.js';

export const deleteShipmentService = async (shipmentId) => {
  try {
    // Verificar si el envío existe en la base de datos.
    const shipmentDB = await selectShipmentByIdModel(shipmentId);

    // Si no se encuentra el envio, lanzar un error.
    if (shipmentDB === null) {
      notFoundError('Shipment');
    }

    // Obtener los datos de shipment y verificar si el envío esta cancelado
    const shipment = await selectShipmentByIdShipmentModel(shipmentId);

    const allowedStatuses = ['delayed', 'cancelled', 'refused'];

    if (!allowedStatuses.includes(shipment.shipment_status)) {
      errorDeleteShipmentNotCancelledNote();
    }

    const deliveryNote = await selectDeliveryNoteByIdShipmentModel(
      shipment.deliveryNote_id
    );

    if (deliveryNote.delivery_status !== 'cancelled') {
      errorDeleteShipmentNotCancelledNote();
    }

    // Primero actualizar las filas correspondientes en la tabla Modules
    await updateModulesByShipmentIdModel(shipmentId);

    // Luego eliminar la fila en la tabla Shipments
    await deleteShipmentModel(shipmentId);
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_SHIPMENT_SERVICE_ERROR',
      'Error al elimniar el envío del servicio'
    );
  }
};
