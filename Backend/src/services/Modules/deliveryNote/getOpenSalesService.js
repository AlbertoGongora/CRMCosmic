import { getPendingSalesModel } from "../../../models/Modules/deliveryNote/getPendingSalesModel.js";
import { handleErrorService } from "../../../utils/handleError.js";

export const getOpenSalesService = async () => {
    try {
        // Obtenemos la lista de ventas abiertas
        const response = await getPendingSalesModel();

        // Retornamos la lista de ventas
        return response;
    } catch (error) {
        handleErrorService(
            error,
            'GET_OPEN_SALES_SERVICE_ERROR',
            'Error al obtener las ventas abiertas desde el servicio'
        )
    }
}