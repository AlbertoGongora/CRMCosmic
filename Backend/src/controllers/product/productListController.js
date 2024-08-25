import { selectProductListService } from '../../services/product/selectProductListService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const productListController = async (req, res, next) => {
  try {
    const response = await selectProductListService();

    res.status(200).send({
      status: 'ok',
      message: 'Lista de Productos',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_PRODUCT_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de productos'
    );
  }
};
