import { selectVisitAgentsModel } from '../../../models/Modules/visits/selectVisitAgentsModel.js';
import { handleErrorService } from '../../../utils/handleError.js';

export const getselesAgentsService = async (searchTerm) => {
  try {
    // Buscamos en la base de datos el usuario.
    const visitAgents = await selectVisitAgentsModel(searchTerm);

    return visitAgents;
  } catch (error) {
    handleErrorService(
      error,
      'GET_AGENT_VISIT_SERVICE_ERROR',
      'Error al obtener el comercial de la visita desde el servicio'
    );
  }
};
