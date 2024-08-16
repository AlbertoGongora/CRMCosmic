import { selectInvoiceListModel } from '../../../models/Modules/invoices/selectInvoiceListModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const selectInvoiceListService = async () => {
  try {
    const listInvoice = await selectInvoiceListModel();

    return listInvoice;
  } catch (error) {
    handleErrorService(
      error,
      'GET_INVOICELIST_SERVICE_ERROR',
      'Error al obtener la lista de facturas desde el servicio'
    );
  }
};
