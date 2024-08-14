import { selectRefVisitModel } from '../../../models/Modules/visits/selectRefVisitModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const selectRefVisitService = async (visitId) => {
  try {
    const response = await selectRefVisitModel(visitId);

    console.log(response);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'GET_REF_SERVICE_ERROR',
      'Error en el servicio al obtener la referencia de una visita'
    );
  }
};
