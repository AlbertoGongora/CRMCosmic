import { fetchShipmentDataModel } from '../../../models/Modules/shipment/fetchShipmentDataModel.js';
import { invalidCredentials } from '../../error/errorService.js';
import { selectCustomerByIdModel } from '../../../models/customer/selectCustomerByIdModel.js';
import { updateShipmentStatusModel } from '../../../models/Modules/shipment/updateShipmentStatusModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const closeShipmentStatusService = async (
  shipmentId,
  deliveryNote_id,
  role,
  newStatus
) => {
  try {
    console.log(
      `Closing shipment with ID: ${shipmentId} by delivery note ID: ${deliveryNote_id} with role: ${role}`
    );

    const shipmentData = await fetchShipmentDataModel(shipmentId);
    if (!shipmentData) {
      console.log(`Shipment with ID: ${shipmentId} does not exist`);
      invalidCredentials('El envío no existe');
    }

    if (shipmentData.deliveryNote_id !== deliveryNote_id && role !== 'admin') {
      console.log(
        `Delivery Note ID: ${deliveryNote_id} with role: ${role} does not have permission to modify shipment ID: ${shipmentId}`
      );
      invalidCredentials('No tienes permiso para modificar este envío');
    }

    console.log(
      `Updating status of shipment ID: ${shipmentId} to ${newStatus}`
    );
    await updateShipmentStatusModel(shipmentId, newStatus);

    if (newStatus === 'delivered') {
      const customer = await selectCustomerByIdModel(shipmentData.customer_id);
      const email = customer.email;
      console.log(
        `Email for delivery: ${email}, ref_SH: ${shipmentData.ref_SH}`
      );
      return { email, ref_SH: shipmentData.ref_SH };
    }

    return null;
  } catch (error) {
    handleErrorService(
      error,
      'CLOSE_SHIPMENT_SERVICE_ERROR',
      'Error en el servicio al cerrar el envio'
    );
  }
};
