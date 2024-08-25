import { updateShipmentSchema } from '../../../schemas/Modules/shipment/updateShipmentSchema.js';
import { sendEmailForShipmentDelivery } from '../../../services/email/emailService.js';
import { updateShipmentService } from '../../../services/Modules/shipment/updateShipmentService.js';
import { handleErrorController } from '../../../utils/handleError.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const updateShipmentController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(updateShipmentSchema, req.body);

    // Obtener el estado actual del envío del body.
    const { shipment_status } = req.body;

    // Actualizamos el envío en la base de datos.
    const shipment = await updateShipmentService(
      req.params.shipmentId,
      shipment_status
    );

    // Enviar email solo si el estado es 'delivered'
    if (shipment_status === 'delivered' && shipment.customer_email) {
      await sendEmailForShipmentDelivery(shipment.ref_SH, shipment.customer_email);
    }

    // Devolvemos el envío actualizado.
    res.status(200).send({
      status: 'ok',
      message: `Envío ${shipment_status === 'delivered' ? 'entregado y email enviado' : 'actualizado'} con éxito`,
      data: shipment,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'UPDATE_SHIPMENT_CONTROLLER_ERROR',
      'Error en el controlador al modificar un envio'
    );
  }
};
