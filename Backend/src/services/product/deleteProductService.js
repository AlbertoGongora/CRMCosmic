import { selectProductByIdModel } from '../../models/products/selectProductByIdModel.js';
import { notFoundError } from '../error/errorService.js';
import { handleErrorService } from '../../utils/handleError.js';
import { deleteProductModel } from '../../models/products/deleteProductModel.js';

export const deleteProductService = async (product_id) => {
  try {
    // Obtenemos el producto
    const product = await selectProductByIdModel(product_id);

    // Verificamos que exista
    if (product === null) {
      notFoundError('Producto');
    }

    // Lógica de la eliminación
    const response = await deleteProductModel(product_id);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_PRODUCT_SERVICE_ERROR',
      'Error al elimniar un producto del servicio'
    );
  }
};
