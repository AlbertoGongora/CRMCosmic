import { selectProductByIdModel } from '../../models/products/selectProductByIdModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const getProductService = async () => {
  try {
    const product = await selectProductByIdModel(req.params.productId);

    return product;
  } catch (error) {
    handleErrorService(
      error,
      'NEW_PRODUCT_SERVICE_ERROR',
      'Error al obtener el producto desde el servicio'
    );
  }
};
