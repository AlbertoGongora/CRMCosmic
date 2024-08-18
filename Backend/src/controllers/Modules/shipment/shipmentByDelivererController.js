import { getShipmentsByDelivererService } from '../../../services/Modules/shipment/getShipmentsByDelivererService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const shipmentByDelivererController = async (req, res, next) => {
  try {
    const response = await getShipmentsByDelivererService();

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SHIPMENT_LIST_ASSIGN_DELIVERER_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de envios asosiados a los repartidores'
    );
  }
};
