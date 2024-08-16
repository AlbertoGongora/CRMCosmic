import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { newProductSchema } from '../../schemas/product/newProductSchema.js';
import { insertProductService } from '../../services/product/insertProductService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const newProductController = async (req, res, next) => {
  try {
    //validamos el body
    await validateSchemaUtil(newProductSchema, req.body);

    // Insertamos el producto en la base de datos
    await insertProductService(req.body);

    // Respuesta al Admin
    res.status(201).send({
      status: 'ok',
      message: 'El Producto ha sido creado.',
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'NEW_PRODUCT_CONTROLLER_ERROR',
      'Error en el controlador de registro de producto'
    );
  }
};
