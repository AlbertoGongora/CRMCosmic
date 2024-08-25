import { newShipmentService } from '../../../services/Modules/shipment/newShipmentService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { newShipmentSchema } from '../../../schemas/Modules/shipment/newShipmentSchema.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const newShipmentController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud con el esquema
    await validateSchemaUtil(newShipmentSchema, req.body);

    // Llamar al servicio para insertar el envío
    const result = await newShipmentService(req.body);

    // Enviar respuesta exitosa
    res.status(201).send({
      status: 'ok',
      message:'Envío creado correctamente',
      data: result,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'NEW_SHIPMENT_CONTROLLER_ERROR',
      'Error en el controlador de registro de un envio'
    );
  }
};
