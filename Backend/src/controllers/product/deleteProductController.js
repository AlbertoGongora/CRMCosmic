import { deleteProductService } from '../../services/product/deleteProductService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const deleteProductController = async (req, res, next) => {
  try {
    const response = await deleteProductService(req.params.product_id);

    // Respondemos al cliente
    res.status(200).send({
      status: 'ok',
      message: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_PRODUCT_CONTROLLER_ERROR',
      'Error en el controlador al eliminar un producto'
    );
  }
};
