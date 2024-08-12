import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { UpdateProductSchema } from '../../schemas/product/newProductSchema.js';
import { updateProductService } from '../../services/product/selectProductByIdModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const updateProductController = async (req, res, next) => {
  try {
    //Validar el body con joi.
    await validateSchemaUtil(UpdateProductSchema, req.body);

    // Actualizamos el Producto en la base de datos.
    const product = await updateProductService(req.body, req.params.id_product);

    res.send({
      status: 'ok',
      message: 'Product update',
      data: { product },
    });
  } catch (error) {
    handleErrorService(
      error,
      'GET_USER_LIST_SERVICE_ERROR',
      'Error en el controlador al modificar un producto'
    );
  }
};
