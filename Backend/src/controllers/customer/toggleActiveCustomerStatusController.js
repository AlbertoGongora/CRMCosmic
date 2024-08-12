import { toggleCustomerActivationService } from '../../services/customer/toggleCustomerActivationService.js';
import { controllerError } from '../../services/error/errorServer.js';

export const toggleActiveCustomerStatusController = async (req, res, next) => {
  try {
    console.log('llega a toggleActiveCustomerStatusController');
    const id_customer = req.body.id;

    const customer = await toggleCustomerActivationService(id_customer);

    // Devolvemos el cliente actualizado.
    const isActive = customer.active === '1' ? true : false;
    const message = `Estado del cliente cambiado a: ${isActive ? 'Activo' : 'Inactivo'}`;
    res.send({
      status: 'ok',
      isActive,
      message,
    });
  } catch (error) {
    next(
      controllerError(
        'UPDATE_STATUS_USER_CONTROLLER_ERROR',
        error.message ||
          'Error en el controlador al cambiar el estado de un cliente',
        error.statusCode || 500
      )
    );
  }
};
