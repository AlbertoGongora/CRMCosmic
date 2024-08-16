import { getCustomersListService } from '../../services/customer/getCustomersListService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const getCustomerListController = async (req, res, next) => {
  try {
    const customersList = await getCustomersListService();

    res.status(200).send({
      status: 'ok',
      data: customersList,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_CUSTOMER_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de clientes'
    );
  }
};
