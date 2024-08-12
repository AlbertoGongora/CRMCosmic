import { selectProductById } from '../../models/products/selectProductById.js';
import { toggleProductActiveModel } from '../../models/products/toggleProductStatusModel.js';
import { handleErrorService } from '../../utils/handleError.js';
import { notFoundError } from '../error/errorService.js';

export const toggleProductActivationService = async (productId) => {
  try {
    // Comprobamos que exista el producto
    const product = await selectProductById(productId);

    if (!product) {
      notFoundError('Product');
    }

    // Condicional: si está activo desactivar, y viceversa
    const newStatus = product.active === 0 ? true : false;

    // Actualizar el producto en la base de datos
    await toggleProductActiveModel(productId, newStatus);

    // Obtener el producto actualizado
    const updatedProduct = await selectProductById(productId);

    // Devolver el producto actualizado
    return updatedProduct;
  } catch (error) {
    handleErrorService(
      error,
      'GET_USER_LIST_SERVICE_ERROR',
      'Error en el servicio al cambiar el estado de un producto'
    );
  }
};
