import { fetchShipmentDataModel } from '../../../models/Modules/shipment/fetchShipmentDataModel.js';
import { invalidCredentials, notFoundError } from '../../error/errorService.js';
import { selectCustomerByIdModel } from '../../../models/customer/selectCustomerByIdModel.js';
import { updateShipmentStatusModel } from '../../../models/Modules/shipment/updateShipmentStatusModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { selectShipmentByIdModel } from '../../../models/Modules/shipment/selectShipmentByIdModel.js';

export const closeShipmentStatusService = async (
  shipmentId,
  newStatus
) => {
  try {
    // Verificar si el envío existe en la base de datos.
    const shipmentDB = await selectShipmentByIdModel(shipmentId);
    if (!shipmentDB) notFoundError('Shipment');

    const shipmentData = await fetchShipmentDataModel(shipmentId);

    // Actualizar estado del envío
    await updateShipmentStatusModel(shipmentId, newStatus);

    // Retornar email y referencia si el estado es 'delivered'
    if (newStatus === 'delivered') {
      const customer = await selectCustomerByIdModel(shipmentData.customer_id);
      return { email: customer.email, ref_SH: shipmentData.ref_SH };
    }

    // Enviar null solo si no se cumple la condición
    return {};
  } catch (error) {
    handleErrorService(
      error,
      'CLOSE_SHIPMENT_SERVICE_ERROR',
      'Error en el servicio al cerrar el envío'
    );
  }
};
