import { selectProductByIdModel } from '../../models/products/selectProductByIdModel.js';
import { updateProductModel } from '../../models/products/updateProductModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const updateProductService = async (body, productId) => {
  try {
    const { name, description, price, stock } = body;

    // Comprobar si el producto existe.
    const existProduct = await selectProductByIdModel(productId);

    // si existe, comprobar si es el mismo producto.
    if (existProduct && existProduct.id_product !== productId) {
      productAlreadyRegisteredError(); //! Esta funcion no existe
    }

    // Actualizar el producto en la base de datos.
    await updateProductModel(productId, name, description, price, stock);

    // devolver el producto actualizado.
    const product = await selectProductByIdModel(productId);
    return product;
  } catch (error) {
    handleErrorService(
      error,
      'UPDATE_PRODUCT_SERVICE_ERROR',
      'Error al actulizar el producto desde el servicio'
    );
  }
};
