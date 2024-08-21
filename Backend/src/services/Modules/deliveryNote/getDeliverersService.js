import { getDeliverersModel } from "../../../models/Modules/deliveryNote/getDeliverersModel.js";
import { handleErrorService } from "../../../utils/handleError.js";

export const getOpenSalesService = async () => {
    try {
        // Obtenemos la lista de repartidores
        const response = await getDeliverersModel();

        // Retornamos la lista de repartidores
        return response;
    } catch (error) {
        handleErrorService(
            error,
            'GET_OPEN_SALES_SERVICE_ERROR',
            'Error al obtener los deliverers desde el servicio'
        )
    }
};