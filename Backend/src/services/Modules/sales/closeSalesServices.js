import { selectDeliveryNoteByIdSalesModel } from "../../../models/Modules/deliveryNote/selectDeliveryNoteByIdSalesModel.js";
import { updateStatusSalesModel } from "../../../models/Modules/sales/updateStatusSalesModel.js";
import { selectShipmentByIdNoteModel } from "../../../models/Modules/shipment/selectShipmentByIdNoteModel.js";
import { handleErrorService } from "../../../utils/handleError.js"
import { errorNoteAndShipmentNotCancelled, errorNoteNotCancelled } from "../../error/errorService.js";

export const closeSalesServices = async (body) => {
    try {
        // Obtenemos el id y el nuevo estado del body
        const { id, newStatus } = body;

        // Obtener el estado actual del albarán
        const deliveryNote = await selectDeliveryNoteByIdSalesModel(id);

        // Obtener el estado del envío
        const shipment = await selectShipmentByIdNoteModel(deliveryNote.id_note);

        // Verificar si hay datos en shipment
        if (shipment && deliveryNote) {
        // Verificar si el estado del albarán y el estado de envío están cancelados
        if (deliveryNote.delivery_status !== 'cancelled' || shipment.shipment_status !== 'cancelled') {
            errorNoteAndShipmentNotCancelled();
        }
        }


        if (shipment) {
        if (shipment.shipment_status !== 'cancelled') {
            errorNoteAndShipmentNotCancelled();
        }
        }

        if (deliveryNote) {
        if (deliveryNote.delivery_status !== 'cancelled') {
            errorNoteNotCancelled();
        }
        }


        // Inserto en la base de datos el estado
        const statusUpdate = await updateStatusSalesModel(id, newStatus);

        // Retorno el estado de la actualización
        return statusUpdate;
    } catch (error) {
        handleErrorService(
            error,
            'CLOSE_SALES_SERVICE_ERROR',
            'Error al cerrar la venta'
        )
    }
}