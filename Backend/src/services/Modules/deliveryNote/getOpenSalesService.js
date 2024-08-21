import { getPendingSalesModel } from "../../../models/Modules/deliveryNote/getPendingSalesModel.js";
import { handleErrorService } from "../../../utils/handleError.js";


export const getOpenSalesService = async () => {
    try {
        const response = await getPendingSalesModel();

        return response;
    } catch (error) {
        handleErrorService(
            error,
            'GET_OPEN_SALES_SERVICE_ERROR',
            'Error al obtener las ventas abiertas desde el servicio'
        )
    }
}