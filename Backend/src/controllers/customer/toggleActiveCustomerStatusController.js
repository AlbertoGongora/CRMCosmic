import { toggleCustomerActivationService } from '../../services/customer/toggleCustomerActivationService.js';
import { handleErrorController } from '../../utils/handleError.js';

export const toggleActiveCustomerStatusController = async (req, res, next) => {
  try {
    const id_customer = req.body.id;

    const customer = await toggleCustomerActivationService(id_customer);

    // Devolvemos el cliente actualizado.
    const isActive = customer.active === '1' ? true : false;
    const message = `Estado del cliente cambiado a: ${isActive ? 'Activo' : 'Inactivo'}`;
    res.status(200).send({
      status: 'ok',
      isActive,
      message,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'TOGGLE_ESTATUS_CONTROLLER_ERROR',
      'Error en el controlador al cambiar el estado de un cliente'
    );
  }
};
