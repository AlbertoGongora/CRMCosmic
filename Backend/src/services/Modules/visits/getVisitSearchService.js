import { selectVisitSearchModel } from '../../../models/Modules/visits/selectVisitSearchModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getVisitSearchService = async (searchTerm) => {
  try {
    // Buscamos en la base de datos el usuario.
    console.log(searchTerm);
    const visit = await selectVisitSearchModel(searchTerm);

    return visit;
  } catch (error) {
    handleErrorService(
      error,
      'GET_VISIT_SEARCH_SERVICE_ERROR',
      'Error al obtener la lista de busquedas de cliente desde el servicio'
    );
  }
};
