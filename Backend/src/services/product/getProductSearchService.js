import { selectProductSearchModel } from '../../models/products/selectProductSearchModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const getProductSearchService = async (search) => {
  try {
    // Buscamos en la base de datos el producto.
    const product = await selectProductSearchModel(search);

    return product;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SEARCH_SERVICE_ERROR',
      'Error al obtener la lista de busquedas de productos desde el servicio'
    );
  }
};
