import { handleErrorService } from "../../../utils/handleError.js"
import { selectSalesListModel } from "../../../models/Modules/sales/selectSalesListModel.js";

export const selectSalesListService = async () => {
    try {
        // Obtenemos la lista de ventas
        const listSales = await selectSalesListModel();

        // Retornamos la lista de ventas
        return listSales;
    } catch (error) {
        handleErrorService(
            error,
            'GET_SALES_LIST_SERVICE_ERROR',
            'Error al obtener la lista de ventas desde el servicio'
        )
    }
}