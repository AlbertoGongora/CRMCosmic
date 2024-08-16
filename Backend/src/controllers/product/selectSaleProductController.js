import { SaleProductSchema } from '../../schemas/product/SaleProductSchema.js';
import { insertSaleProductService } from '../../services/product/insertSaleProductService.js';
import { handleErrorController } from '../../utils/handleError.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const selectSaleProductController = async (req, res, next) => {
  try {
    //validamos el body
    await validateSchemaUtil(SaleProductSchema, req.body);

    // Inserto el producto en la base de datos
    const response = await insertSaleProductService(
      req.body,
      req.params.productId
    );

    res.status(200).send({
      status: 'ok',
      message: 'venta realizada con exito.!',
      data: { response },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'SELECT_PRODUCT_SALE_CONTROLLER_ERROR',
      'Error en el controlador al crear una venta de producto'
    );
  }
};
