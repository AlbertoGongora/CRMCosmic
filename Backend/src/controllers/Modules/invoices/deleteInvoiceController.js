import { deleteInvoiceService } from '../../../services/Modules/invoices/deleteInvoiceService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const deleteInvoiceController = async (req, res, next) => {
  try {
    // Eliminar la factura de la base de datos.
    const response = await deleteInvoiceService(req.params.invoiceId);

    // Respondemos al cliente.
    res
      .status(200)
      .send({ status: 'ok', message: 'Factura eliminada', data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_INVOICE_CONTROLLER_ERROR',
      'Error en el controlador al eliminar una factura'
    );
  }
};
