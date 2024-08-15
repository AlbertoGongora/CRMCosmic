import { updateSaleProductSchema } from '../../../schemas/Modules/sale/updateSaleProductSchema.js';
import { updateSalesService } from '../../../services/Modules/sales/updateSalesService.js';
import { handleErrorController } from '../../../utils/handleError.js';

import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const updateSalesController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateSaleProductSchema, req.body);
    
    // Actualizamos la venta de producto en la base de datos
     const updatedSale = await updateSalesService(req.params.id_sale, req.body);

    res.status(200).send({
      status: 'ok',
      message: "Venta actualizada correctamente",
      data: updatedSale,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'UPDATE_SALES_CONTROLLER_ERROR',
      'Error en el controlador al actualizar una venta'
    )
  }
};
