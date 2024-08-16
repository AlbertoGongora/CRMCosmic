import { selectInvoiceById } from '../../../models/Modules/invoices/selectInvoiceById.js';
import { statusUpdateInvoiceModel } from '../../../models/Modules/invoices/statusUpdateInvoiceModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { invalidCredentials } from '../../error/errorService.js';

export const statusUpdateInvoiceService = async (invoiceId, body) => {
  try {
    const { invoice_status } = body;

    // Comprobar si la factura ya existe.
    const invoiceExists = await selectInvoiceById(invoiceId);

    if (!invoiceExists) {
      invalidCredentials('La factura no existe en la base de datos.');
    }

    // Actualizar la factura en la base de datos.
    const updateInvoice = await statusUpdateInvoiceModel(
      invoiceId,
      invoice_status
    );
    return updateInvoice;
  } catch (error) {
    handleErrorService(
      error,
      'CLOSE_INVOICE_SERVICE_ERROR',
      'Error al cerrar la factura'
    );
  }
};
