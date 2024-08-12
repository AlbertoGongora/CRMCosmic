import { deleteCustomerService } from '../../services/customer/deleteCustomerService.js';
import { handleErrorController } from '../../utils/handleError.js';
import { success } from '../../utils/success.js';

export const deleteCustomerController = async (req, res, next) => {
  try {
    // Obtener el id del cliente.
    const id_customer = req.params.customerId;

    // Eliminar el cliente de la base de datos.
    const response = await deleteCustomerService(id_customer);

    // Respondemos al cliente.
    res.status(200).send(success(response));
  } catch (error) {
    // Manejo de errores
    handleErrorController(
      error,
      next,
      'GET_USER_LIST_CONTROLLER_ERROR',
      'Error en el controlador al eliminar un cliente'
    );
  }
};
