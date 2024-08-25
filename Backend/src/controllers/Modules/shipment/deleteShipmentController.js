import { deleteShipmentService } from '../../../services/Modules/shipment/deleteShipmentService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const deleteShipmentController = async (req, res, next) => {
  try {
    // Eliminar el envío y las referencias en la base de datos.
    await deleteShipmentService(req.params.shipmentId);

    // Respondemos al cliente.
    res.status(200).send({
      status: 'ok',
      message: 'Envío eliminado correctamente',
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'DELETE_SHIPMENT_CONTROLLER_ERROR',
      'Error en el controlador al eliminar un envio'
    );
  }
};
