import { deleteCustomerModel } from '../../models/customer/deleteCustomerModel.js';
import { selectCustomerByIdModel } from '../../models/customer/selectCustomerByIdModel.js';
import { handleErrorService } from '../../utils/handleError.js';

export const deleteCustomerService = async (id_customer) => {
  try {
    // Obtener el id del address asosiado
    const custumerAddress = await selectCustomerByIdModel(id_customer);

    // Eliminar el cliente
    const deleteCustomer = await deleteCustomerModel(
      id_customer,
      custumerAddress.address_id
    );

    return deleteCustomer;
  } catch (error) {
    handleErrorService(
      error,
      'DELETE_CUSTOMER_SERVICE_ERROR',
      'Error al elimniar un cliente del servicio'
    );
  }
};
