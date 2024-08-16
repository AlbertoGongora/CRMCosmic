import { selectProductListModel } from '../../models/products/selectProductListModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const selectProductListService = async () => {
  try {
    const listProducts = await selectProductListModel();

    return listProducts;
  } catch (error) {
    handleErrorService(
      error,
      'GET_PRODUCTR_LIST_SERVICE_ERROR',
      'Error al obtener la lista de productos desde el servicio'
    );
  }
};
