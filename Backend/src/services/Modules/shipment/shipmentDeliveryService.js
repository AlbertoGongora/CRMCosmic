import { getShipmentsByDeliverer } from '../../../models/Modules/getShipmentsByDeliverer.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getShipmentsByDeliverer = async () => {
    try {
      const shipments = await getShipmentsByDeliverer();
      return shipments;
    } catch (error) {
      handleErrorService(
        error,
        'NEW_SHIPMENT_SERVICE_ERROR',
        'Error al obtener la lista de envios asosiados a los repartidores en el servicio'
      );
    }
  };
