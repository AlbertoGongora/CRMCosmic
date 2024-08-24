import { insertPaymentModel } from '../../../models/Modules/payments/insertPaymentModel.js';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { notFoundError } from '../../error/errorService.js';
import { selectInvoiceByIdModel } from '../../../models/Modules/invoices/selectInvoiceByIdSModel.js';
import { selectNewPaymentModelById } from '../../../models/Modules/payments/selectNewPaymentModelById.js';

export const newPaymentService = async (body) => {
  try {
    // Obtenemos el cuerpo de la petición
    const { invoice_id, payment_date } = body;

    // Revisamos que la factura exista
    const invoice = await selectInvoiceByIdModel(invoice_id);

    if (!invoice) {
      notFoundError('Invoice');
    }

    // ? Creamos una id para el pago
    const payment_id = crypto.randomUUID();

    // Obtenemos la referencia máxima de la tabla Payments
    const maxRef = await getMaxReference5Digits('Payments', 'ref_PM');

    // Generamos la nueva referencia de Payments
    const ref = generateReference5DigitsFromRef('PM', maxRef);

    // Insertamos la factura en la base de datos
    await insertPaymentModel(payment_id, ref, invoice_id, payment_date);

    const data = await selectNewPaymentModelById(payment_id);

    return data;
  } catch (error) {
    handleErrorService(
      error,
      'INSERT_PAYMENT_SERVICE_ERROR',
      'Error en el servicio al insertar el pago en la base de datos'
    );
  }
};
