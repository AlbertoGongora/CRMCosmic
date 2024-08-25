import { selectSalesListService } from '../../../services/Modules/sales/selectSalesListService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getSalesController = async (req, res, next) => {
  try {
    // Obtengo la lista de ventas
    const listSales = await selectSalesListService();

    res.status(200).send({
      status: 'ok',
      message: 'Lista de ventas',
      data: listSales,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_SALES_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de ventas'
    );
  }
};
