import { getDeliveryNotesModel } from "../../../models/deliveryNote/getDeliveryNotesModel.js";
import { handleErrorService } from "../../../utils/handleError.js"

export const getDeliveryNoteService = async (id) => {
    try {
        // Obtiene las notas de entrega utilizando la función del modelo
        const result = await getDeliveryNotesModel();

        // Retorna la lista de albaranes
        return result;
    } catch (error) {
        handleErrorService(
            error,
            'GET_DELIVERY_NOTE_SERVICE_ERROR',
            'Error en el servicio al obtener la lista de los albaranes'
        );
    }
}