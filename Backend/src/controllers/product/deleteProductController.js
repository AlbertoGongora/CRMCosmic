import { deleteProductService } from '../../services/product/deleteProductService.js';
import { handleErrorController } from '../../utils/handleError.js';
import { success } from '../../utils/success.js';

export const deleteProductController = async (req, res, next) => {
  try {
    // Obtenemos el id del producto
    const product_id = req.params.product_id;

    const response = await deleteProductService(product_id);

    // Respondemos al cliente
    res.status(200).send(success(response));
  } catch (error) {
    handleErrorController(
      error,
      next,
      'GET_USER_LIST_CONTROLLER_ERROR',
      'Error en el controlador al eliminar un producto'
    );
  }
};
