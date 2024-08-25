import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { updateStatusSchema } from '../../../schemas/Modules/sale/updateStatusSchema.js';
import { closeSalesServices } from '../../../services/Modules/sales/closeSalesServices.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const closeSalesController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateStatusSchema, req.body);

    // Llamamos al servicio y obtenemos el status
    const statusUpdate = await closeSalesServices(req.body);

    res.status(200).send({
      status: 'ok',
      message: statusUpdate,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CLOSE_SALES_CONTROLLER_ERROR',
      'Error en el controlador al cerrar una venta'
    );
  }
};
