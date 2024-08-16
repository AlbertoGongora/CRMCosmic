import { newInvoiceSchema } from '../../../schemas/Modules/invoice/newInvoiceSchema.js';
import { newInvoiceService } from '../../../services/Modules/invoices/insertInvoiceService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { success } from '../../../utils/success.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const newInvoiceController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newInvoiceSchema, req.body);

    // Insertamos el cliente en la base de datos
    const response = await newInvoiceService(req.user.id_user, req.body);

    // Respondemos al cliente
    res.status(201).send(success(response));
  } catch (error) {
    handleErrorController(
      error,
      next,
      'INSERT_INVOICE_CONTROLLER_ERROR',
      'Error en el controlador al insertar una factura'
    );
  }
};
