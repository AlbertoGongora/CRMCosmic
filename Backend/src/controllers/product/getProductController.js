import { getProductService } from '../../services/product/getProductService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const getProductController = async (req, res, next) => {
  try {
    const response = await getProductService(req.params.productId);

    res.status(200).send({
      status: 'ok',
      data: { response },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_PRODUCT_CONTROLLER_ERROR',
      'Error en el controlador al obtener una producto'
    );
  }
};
