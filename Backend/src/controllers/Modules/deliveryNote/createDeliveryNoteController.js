import { createDeliveryNoteService } from '../../../services/Modules/deliveryNote/insertDeliveryNotesServices.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const createDeliveryNoteController = (emitDeliveryAssigned) => async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchema, req.body);

    // Llamar al servicio para crear la nota de entrega
    const result = await createDeliveryNoteService(req.body);

    res.status(201).send({
      status: 'ok',
      message: 'Nota de entrega creada correctamente',
      data: result
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CREATE_DELIVERY_NOTE_CONTROLLER_ERROR',
      'Error en el controlador para crear una nota de entrega'
    )
  }
};
