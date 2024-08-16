import { getUnasignedSalesModel } from '../../../models/Modules/invoices/getUnasignedSalesModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getUnasignedSalesService = async () => {
  try {
    const unasignedSales = await getUnasignedSalesModel();

    return unasignedSales;
  } catch (error) {
    handleErrorService(
      error,
      'GET_UNSIGBED_SALES_LIST_SERVICE_ERROR',
      'Error al obtener la  venta asignada desde el servicio'
    );
  }
};
