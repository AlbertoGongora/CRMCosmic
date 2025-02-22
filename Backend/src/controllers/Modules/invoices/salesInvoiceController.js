import { getUnasignedSalesService } from '../../../services/Modules/invoices/getUnasignedSalesService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getUnasignedSalesController = async (req, res, next) => {
  try {
    const response = await getUnasignedSalesService();

    res.status(200).send({ status: 'ok', data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_UNSIGNED_SALES_CONTROLLER_ERROR',
      'Error en el controlador al obtener la venta asignada'
    );
  }
};
