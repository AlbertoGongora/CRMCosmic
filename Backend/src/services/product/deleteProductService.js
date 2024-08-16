import { deleteProductModel } from '../../models/products/deleteProductModel.js';
import { selectProductById } from '../../models/products/selectProductById.js';
import { handleErrorService } from '../../utils/handleError.js';
import { notFoundError } from '../error/errorService.js';

export const deleteProductService = async (product_id) => {
  try {
    // Obtenemos el producto
    const product = await selectProductById(product_id);

    // Verificamos que exista
    if (!product) {
      notFoundError('Producto');
    }

    // Lógica de la eliminación
    const response = await deleteProductModel(product_id);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_PRODUCT_LIST_SERVICE_ERROR',
      'Error al elimniar un producto del servicio'
    );
  }
};
