import { selectModuleListDetailModel } from '../../models/Modules/visits/selectModuleListDetailModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const moduleListDetailService = async () => {
  try {
    const response = await selectModuleListDetailModel();

    if (response === undefined) {
      invalidCredentials('Error al obtener los modulos');
    }

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'GET_PRODUCTR_LIST_SERVICE_ERROR',
      'Error al obtener la lista de modulos desde el servicio'
    );
  }
};
