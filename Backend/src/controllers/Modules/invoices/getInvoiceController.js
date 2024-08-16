import { invalidCredentials } from '../../../services/error/errorService.js';
import { selectInvoiceListService } from '../../../services/Modules/invoices/selectInvoiceListService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getInvoiceController = async (req, res, next) => {
  try {
    // Obtengo la lista de facturas
    const response = await selectInvoiceListService();

    if (response === undefined) {
      invalidCredentials('Error al obtener las facturas');
    }

    res.status(200).send({
      status: 'ok',
      message: 'Facturas',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_INVOICE_LIST_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de facturas'
    );
  }
};
