import { selectSalesSearchModel } from "../../../models/Modules/sales/selectSalesSearchModel.js";
import { handleErrorService } from "../../../utils/handleError.js";

export const getSalesSearchService = async (search) => {
  try {
    // Buscamos en la base de datos la venta.
    const sale = await selectSalesSearchModel(search);

    return sale;
  } catch (error) {
    handleErrorService(
      error,
      'GET_SALES_SEARCH_SERVICE_ERROR',
      'Error en el servicio al obtener la lista de busquedas de ventas'
    );
  }
};
