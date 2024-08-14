import { selectUserVisitsByIdModel } from '../../../models/Modules/visits/selectUserVisitsByIdModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const selectUserVisitsByIdService = async () => {
  try {
    const userVisits = await selectUserVisitsByIdModel();

    return userVisits;
  } catch (error) {
    handleErrorService(
      error,
      'GET_VISIT_LIST_SERVICE_ERROR',
      'Error al obtener la lista de clientes desde el servicio'
    );
  }
};
