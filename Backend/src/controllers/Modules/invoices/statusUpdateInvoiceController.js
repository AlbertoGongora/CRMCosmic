import { closedInvoiceSchema } from '../../../schemas/Modules/invoice/newInvoiceSchema.js';
import { statusUpdateInvoiceService } from '../../../services/Modules/invoices/statusUpdateInvoiceService.js';
import { handleErrorController } from '../../../utils/handleError.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const statusUpdateInvoiceController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(closedInvoiceSchema, req.body);

    // Cerramos la factura y obtenemos el email del cliente.
    const response = await statusUpdateInvoiceService(
      req.params.invoiceId,
      req.body
    );

    // Respondemos al cliente.
    res.status(200).send({
      status: 'ok',
      message: 'Factura actualizada con exito',
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CLOSE_INVOICE_CONTROLLER_ERROR',
      'Error en el controlador al cerrar una factura'
    );
  }
};
