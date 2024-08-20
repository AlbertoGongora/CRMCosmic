import { selectModuleDetailModel } from '../../models/Modules/selectModuleDetailModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const selectModuleDetailService = async (moduleId) => {
  try {
    const service = await selectModuleDetailModel(moduleId);

    return service;
  } catch (error) {
    handleErrorService(
      error,
      'GET_MODULE_SERVICE_ERROR',
      'Error al obtener el detalle de un modulo desde el servicio'
    );
  }
};
