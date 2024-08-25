import { getInvoiceSearchService } from '../../../services/Modules/invoices/getInvoiceSearchService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const getInvoiceSearchController = async (req, res, next) => {
  try {
    // Recibimos la cadena completa desde la consulta
    const searchTerm = req.query.searchTerm;

    // Llamamos al servicio
    const response = await getInvoiceSearchService(searchTerm);
    console.log('response', response);
    res.status(200).send({
      status: 'ok',
      message: 'Invoices',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_INVOICE_SEARCH_CONTROLLER_ERROR',
      'Error en el controlador al obtener la lista de factura con la busqueda'
    );
  }
};
