import { getUnasignedInvoicesService } from '../../../services/Modules/payments/getUnasignedInvoicesService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getUnasignedInvoicesController = async (req, res, next) => {
  try {
    const result = await getUnasignedInvoicesService();

    res.status(200).send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_UNSIGNED_PAYMENT_CONTROLLER_ERROR',
      'Error en el controlador al obtener los facturas asignado'
    );
  }
};
