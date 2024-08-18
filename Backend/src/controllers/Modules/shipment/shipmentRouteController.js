import { getModuleShipmentService } from '../../../services/Modules/shipment/getModuleShipmentService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const shipmentRouteController = async (req, res, next) => {
  try {
    const response = await getModuleShipmentService();

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SHIPMENT_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de envios'
    );
  }
};
