import { getOpenSalesService } from '../../../services/Modules/deliveryNote/getOpenSalesService.js';
import { handleErrorController } from '../../../utils/handleError.js';
import { success } from '../../../utils/success.js';

export const getOpenSalesController = async (req, res, next) => {
  try {
    const response = await getOpenSalesService();

    res.json(success({ data: response }));
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_OPEN_SALES_CONTROLLER_ERROR',
      'Error en el controlador para obtener las ventas abiertas'
    )
  }
};
