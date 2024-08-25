import { invalidCredentials } from '../../../services/error/errorService.js';
import { selectPaymentsListService } from '../../../services/Modules/payments/selectPaymentsListService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getPaymentsController = async (req, res, next) => {
  try {
    const response = await selectPaymentsListService();

    if (response === undefined) {
      invalidCredentials('Error al obtener los pagos');
    }

    res.status(200).send({
      status: 'ok',
      message: 'Lista de pagos',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_PAYMENT_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de pagos'
    );
  }
};
