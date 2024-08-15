import { deleteSaleService } from '../../../services/Modules/sales/deleteSaleService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const deleteSalesController = async (req, res, next) => {
  try {
    // Pasamos el id para eliminar la venta
    const sale = await deleteSaleService(req.params.id_sale);

    res.status(200).send({
      status: 'ok',
      message: sale,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_SALES_CONTROLLER_ERROR',
      'Error en el controlador al eliminar una venta'
    )
  }
};
