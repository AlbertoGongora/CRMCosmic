import { getOpenSalesService } from '../../../services/Modules/deliveryNote/getOpenSalesService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getOpenSalesController = async (req, res, next) => {
  try {
    const response = await getOpenSalesService();

    res.status(200).send({ data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_OPEN_SALES_CONTROLLER_ERROR',
      'Error en el controlador para obtener las ventas abiertas'
    );
  }
};
