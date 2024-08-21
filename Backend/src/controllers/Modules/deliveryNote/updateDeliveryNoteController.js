import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { updateDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/updateDeliveryNoteSchema.js';
import { updateDeliveryNoteService } from '../../../services/Modules/deliveryNote/updateDeliveryNoteService.js';
import { success } from '../../../utils/success.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const updateDeliveryNoteController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(updateDeliveryNoteSchema, req.body);

    // Llamar al servicio para cerrar el albarán
    await updateDeliveryNoteService(
      req.params.deliveryNote_id,
      req.body
    );

    // Enviar respuesta exitosa
    res.json(success({ message: 'Delivery Note actualizada' }));
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CLOSE_DELIVERY_NOTE_CONTROLLER_ERROR',
      'Error en el controlador para cerrar una nota de entrega'
    )
  }
};
