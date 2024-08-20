import { deleteModuleModel } from '../../models/Modules/deleteModuleModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const deleteModuleService = async (moduleId) => {
  try {
    const deleteModule = await deleteModuleModel(moduleId);

    return deleteModule;
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_MODULE_SERVICE_ERROR',
      'Error al elimniar un modulo del servicio'
    );
  }
};
