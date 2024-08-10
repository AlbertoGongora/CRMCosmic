import { getCustomersListService } from '../../services/customer/getCustomersListService.js';
import { controllerError } from '../../services/error/errorServer.js';

export const getCustomerListController = async (req, res, next) => {
  try {
    const customersList = await getCustomersListService();

    res.status(200).send({
      status: 'ok',
      data: customersList,
    });
  } catch (error) {
    next(
      controllerError(
        'GET_USER_LIST_CONTROLLER_ERROR',
        error.message ||
          'Error en el controlador al obtener la lista de clientes',
        error.statusCode || 500
      )
    );
  }
};
