import { selectDeliveryNoteByIdSalesModel } from "../../../models/Modules/deliveryNote/selectDeliveryNoteByIdSalesModel.js";
import { selectInvoiceIdBySaleIdModel } from "../../../models/Modules/invoices/selectInvoiceIdBySaleIdModel.js";
import { deleteSaleModel } from "../../../models/Modules/sales/deleteSaleModel.js";
import { selectSaleByIdModel } from "../../../models/Modules/sales/selectSaleByIdModel.js";
import { selectShipmentByIdNoteModel } from "../../../models/Modules/shipment/selectShipmentByIdNoteModel.js";
import { handleErrorService } from "../../../utils/handleError.js";
import { errorDeleteSalesHasInvoice, errorDeleteSalesHasNote, errorDeleteSalesHasNoteAndShipment, errorDeleteSalesHasShipments, notFoundError } from "../../error/errorService.js";

export const deleteSaleService = async (id_sale) => {
  try {
    // Obtener la venta
    const sale = await selectSaleByIdModel(id_sale);
    if (!sale) notFoundError('Sale');

    // Verificar si la venta tiene una factura asociada
    const invoiceId = await selectInvoiceIdBySaleIdModel(id_sale);
    if (invoiceId) errorDeleteSalesHasInvoice();

    // Obtener el estado del albarán y del envío
    const deliveryNote = await selectDeliveryNoteByIdSalesModel(id_sale);
    const shipment = deliveryNote ? await selectShipmentByIdNoteModel(deliveryNote.id_note) : null;

    // Validar las condiciones según la existencia de deliveryNote y shipment
    if (deliveryNote && shipment) {
      errorDeleteSalesHasNoteAndShipment();
    } else if (shipment) {
      errorDeleteSalesHasShipments();
    } else if (deliveryNote) {
      errorDeleteSalesHasNote();
    }

    // Eliminar la venta de la base de datos
    const response = await deleteSaleModel(id_sale);
    return response;

  } catch (error) {
    handleErrorService(
      error,
      'DELETE_SALES_SERVICE_ERROR',
      'Error en el servicio al borrar una venta'
    );
  }
};
