import { deleteModuleByIdVisitModel } from '../../../models/Modules/visits/deleteModuleByIdVisitModel.js';
import { deleteVisitModel } from '../../../models/Modules/visits/deleteVisitModel.js';
import { selectmoduleByIdVisitModel } from '../../../models/Modules/visits/selectmoduleByIdVisitModel.js';
import { invalidCredentials } from '../../error/errorService.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { selectIdVisitMosuleByIdModel } from '../../../models/Modules/visits/selectIdVisitMosuleByIdModel.js';

export const selectVisitService = async (id_visit) => {
  try {
    const visit = await selectIdVisitMosuleByIdModel(id_visit);

    if (visit.visit_id !== id_visit) {
      invalidCredentials('No se encontró el identificador de la visita');
    } else {
      //Obtenemos el id del modulo referente a la visita
      const module = await selectmoduleByIdVisitModel(id_visit);

      //Eliminamos el modulo
      await deleteModuleByIdVisitModel(module.id_module);

      //Eliminamos la visita
      await deleteVisitModel(visit.visit_id);
    }
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_VISIT_SERVICE_ERROR',
      'Error al elimniar una visita en el servicio'
    );
  }
};
