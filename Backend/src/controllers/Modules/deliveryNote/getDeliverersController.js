import { getDeliverersService } from '../../../services/Modules/deliveryNote/getDeliverersService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getDeliverersController = async (req, res, next) => {
  try {
    // Llamamos al servicio
    const response = await getDeliverersService();

    // Devolvemos la respuesta
    res.status(200).send({ data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_DELIVERERS_CONTROLLER_ERROR',
      'Error en el controlador para obtener los repartidores'
    );
  }
};
