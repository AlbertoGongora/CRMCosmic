import { insertShipmentModel } from '../../../models/Modules/shipment/insertShipmentModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { notFoundError } from '../../error/errorService.js';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';

import { updateStatusModel } from '../../../models/updateStatusModel.js';
import { insertIdShipmentInModulesByIdNoteModel } from '../../../models/Modules/shipment/insertIdNoteInModulesByIdNoteModel.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { getShipmentDataModel } from '../../../models/Modules/shipment/getShipmentDataModel.js';

export const newShipmentService = async (body) => {
  try {
    const { deliveryNote_id, additional_notes } = body;

    // Verificar si la nota de entrega existe y obtener los datos necesarios
    const deliveryNote = await selectDeliveryNoteByIdModel(deliveryNote_id);

    if (!deliveryNote) {
      notFoundError('Delivery_Note');
    }

    const { customer_id, address_id } = deliveryNote;

    // Crear el id del envío
    const shipmentId = crypto.randomUUID();

    // Obtener la referencia máxima de la tabla Shipments
    let maxRef =
      (await getMaxReference5Digits('Shipments', 'ref_SH')) || 'SH-AA00000';

    // Generar la nueva referencia de Shipments
    const ref = generateReference5DigitsFromRef('SH', maxRef);

    await insertShipmentModel({
      shipmentId,
      ref,
      customer_id,
      address_id,
      deliveryNote_id,
      additional_notes,
    });

    // Cambiamos el estado de la nota de entrega
    await updateStatusModel(
      'DeliveryNotes',
      'delivery_status',
      'id_note',
      'delivering',
      deliveryNote_id
    );

    const result = await getShipmentDataModel(shipmentId);

    // insertar id del envio a la tabla de Modules
    await insertIdShipmentInModulesByIdNoteModel(deliveryNote_id, shipmentId);

    return result;
  } catch (error) {
    handleErrorService(
      error,
      'NEW_SHIPMENT_SERVICE_ERROR',
      'Error al insertar el envio desde el servicio'
    );
  }
};
