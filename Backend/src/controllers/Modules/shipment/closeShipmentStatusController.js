import { closeShipmentStatusService } from '../../../services/Modules/shipment/closeShipmentStatusService.js';
import { sendEmailForShipmentDelivery } from '../../../services/email/emailService.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const closeShipmentStatusController = async (req, res, next) => {
  try {
    const { newStatus } = req.body;
    
    // Llamada al servicio
    const { email, ref_SH } = await closeShipmentStatusService(
      req.params.shipmentId,
      req.user,
      newStatus
    );

    // Enviar email solo si el estado es 'delivered'
    if (newStatus === 'delivered' && email) {
      await sendEmailForShipmentDelivery(ref_SH, email);
    }

    res.status(200).send({
      status: 'ok',
      message: `Envío ${newStatus === 'delivered' ? 'entregado y email enviado' : 'actualizado'} con éxito`,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CLOSE_SHIPMENT_CONTROLLER_ERROR',
      'Error en el controlador al cerrar el envío'
    );
  }
};
