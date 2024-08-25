import { deleteCustomerService } from '../../services/customer/deleteCustomerService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const deleteCustomerController = async (req, res, next) => {
  try {
    // Eliminar el cliente de la base de datos.
    const response = await deleteCustomerService(req.params.customerId);

    // Respondemos al cliente.
    res.status(200).send({
      status: 'ok',
      message: response.message,
    });
  } catch (error) {
    // Manejo de errores
    handleErrorController(
      error,
      next,
      'DELETE_CUSTOMER_CONTROLLER_ERROR',
      'Error en el controlador al eliminar un cliente'
    );
  }
};
