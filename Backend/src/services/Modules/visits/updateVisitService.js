import { invalidCredentials } from '../../error/errorService.js';
import { selectUserByIdModel } from '../../../models/user/selectUserByIdModel.js';
import { getVisitData } from '../../../models/Modules/visits/getVisitData.js';
import { updateVisitModel } from '../../../models/Modules/visits/updateVisitModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const updateVisitService = async (visitId, body) => {
  try {
    // Obtenemos del body la modificación del cliente ha quien vamos a visitar y la fecha de la visita.
    const { id_user, visit_date, observations } = body;

    // Verifica si usuario existe
    const userData = await selectUserByIdModel(id_user);

    if (!userData) {
      invalidCredentials('El usuario no existe');
    }

    // Obtiene la información de la visita existente
    const existingVisitData = await getVisitData(visitId);

    // Identificar campos cambiados
    let fieldsToUpdate = {};
    if (existingVisitData.user_id !== id_user) {
      fieldsToUpdate.user_id = id_user;
    }
    if (existingVisitData.customer_id !== existingVisitData.customer_Id) {
      fieldsToUpdate.customer_id = existingVisitData.customer_Id;
    }

    const visitDataDate = new Date(existingVisitData.visit_date).toISOString();

    if (visitDataDate.visit_date !== visit_date) {
      fieldsToUpdate.visit_date = visit_date;
    }

    if (existingVisitData.observations !== observations) {
      fieldsToUpdate.observations = observations;
    }

    // Actualizar solo los campos que han cambiado
    if (Object.keys(fieldsToUpdate).length > 0) {
      await updateVisitModel(
        visitId,
        id_user,
        existingVisitData.customer_Id,
        fieldsToUpdate.visit_date,
        fieldsToUpdate.observations
      );
      return { status: 'ok', message: 'Visita actualizada exitosamente' };
    } else {
      return { status: 'ok', message: 'Los datos ya estaban registrados.' };
    }
  } catch (error) {
    handleErrorService(
      error,
      'UPDATE_VISIT_SERVICE_ERROR',
      'Error en el servicio al modificar un usuario'
    );
  }
};
