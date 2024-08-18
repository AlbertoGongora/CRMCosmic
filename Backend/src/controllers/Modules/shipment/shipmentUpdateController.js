import { updateShipmentSchema } from '../../../schemas/Modules/shipment/updateShipmentSchema.js';
import { updateShipmentService } from '../../../services/Modules/shipment/updateShipmentService.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const shipmentUpdateController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(updateShipmentSchema, req.body);

    // Actualizamos el envío en la base de datos.
    const shipment = await updateShipmentService(
      req.params.shipmentId,
      req.body
    );

    // Devolvemos el envío actualizado.
    res.send({
      status: 'ok',
      message: 'Envío actualizado',
      data: shipment,
    });
  } catch (error) {
    handleErrorService(
      error,
      'UPDATE_CUSTOMER_CONTROLLER_ERROR',
      'Error en el controlador al modificar un envio'
    );
  }
};
