import { selectDeliveryNoteSearchModel } from "../../../models/Modules/deliveryNote/selectDeliveryNoteSearchModel.js";
import { handleErrorService } from "../../../utils/handleError.js";

export const getDeliveryNoteSearchService = async (search) => {
    try {
        // Buscamos en la base de datos los albaranes.
        const deliveryNotes = await selectDeliveryNoteSearchModel(search);
    
        return deliveryNotes;
    } catch (error) {
        handleErrorService(
            error,
            'GET_DELIVERY_NOTE_SEARCH_SERVICE_ERROR',
            'Error en el servicio al obtener la lista de busquedas de albaranes'
        )
    }
}
