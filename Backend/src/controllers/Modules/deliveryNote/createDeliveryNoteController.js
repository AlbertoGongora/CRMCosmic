import { createDeliveryNoteService } from '../../../services/Modules/deliveryNote/insertDeliveryNotesServices.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js';
import { success } from '../../../utils/success.js';
import { handleErrorController } from '../../../utils/handleError.js';

export const createDeliveryNoteController = (emitDeliveryAssigned) => async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchema, req.body);

    // Llamar al servicio para crear la nota de entrega
    const result = await createDeliveryNoteService(req.body);

    // // Emitir un evento al repartidor específico si el deliverer_id está presente
    // if (deliverer_id) {
    //   emitDeliveryAssigned(deliverer_id, result.id_note);
    // } else {
    //   console.log('No se encontró deliverer_id para emitir el evento');
    // }

    res.json(success({ message: 'Albarán creado con éxito', data: result }));
  } catch (error) {
    handleErrorController(
      error,
      next,
      'CREATE_DELIVERY_NOTE_CONTROLLER_ERROR',
      'Error en el controlador para crear una nota de entrega'
    )
  }
};
