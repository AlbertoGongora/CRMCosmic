import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { UpdateProductSchema } from '../../schemas/product/newProductSchema.js';
import { updateProductService } from '../../services/product/updateProductService.js';
import { handleErrorService } from '../../utils/handleError.js';

export const updateProductController = async (req, res, next) => {
  try {
    //Validar el body con joi.
    await validateSchemaUtil(UpdateProductSchema, req.body);

    // Actualizamos el Producto en la base de datos.
    const product = await updateProductService(req.body, req.params.productId);

    res.status(200).send({
      status: 'ok',
      message: 'Producto actualizado con exito',
      data: { product },
    });
  } catch (error) {
    handleErrorService(
      error,
      next,
      'UPDATE_PRODUCT_CONTROLLER_ERROR',
      'Error en el controlador al modificar un producto'
    );
  }
};
