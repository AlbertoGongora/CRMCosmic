import { getShipmentListService } from '../../../services/Modules/shipment/getShipmentListService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getShipmentListController = async (req, res, next) => {
  try {
    const response = await getShipmentListService();

    res.status(200).send({
      status: 'ok',
      message: 'Lista de envios',
      data: response
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SHIPMENT_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de envios'
    );
  }
};
