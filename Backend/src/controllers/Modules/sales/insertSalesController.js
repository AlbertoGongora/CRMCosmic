import { newSaleProductSchema } from '../../../schemas/Modules/sale/newSaleProductSchema.js';
import { insertSalesService } from '../../../services/Modules/sales/insertSalesService.js';
import { handleErrorController } from '../../../utils/handleError.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const insertSalesController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newSaleProductSchema, req.body);

    // Inserto la venta en la base de datos
    const sale = await insertSalesService(req.body, req.user.id_user);

    res.status(200).send({
      status: 'ok',
      message: { sale },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'INSERT_SALES_CONTROLLER_ERROR',
      'Error en el controlador al insertar una venta'
    );
  }
};
