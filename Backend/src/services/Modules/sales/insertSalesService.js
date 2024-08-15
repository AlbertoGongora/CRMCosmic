import { insertSaleProductModel } from '../../../models/Modules/sales/insertSaleProductModel.js';
import { selectCustomerByIdModel } from '../../../models/Modules/sales/selectCustomerByIdModel.js';
import { selectProductByIdModel } from '../../../models/Modules/sales/selectProductByIdModel.js';
import { insertModuleSalesModel } from '../../../models/Modules/sales/insertModuleSalesModel.js';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';
import { selectUserByIdModel } from '../../../models/user/selectUserByIdModel.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';
import { limitedStock, notFoundError } from '../../error/errorService.js';
import { handleErrorService } from '../../../utils/handleError.js';
import { selectCustomerModel } from '../../../models/Modules/sales/selectCustomerModel.js';
import { selectProductModel } from '../../../models/Modules/sales/selectProductModel.js';
import { selectQuantityModel } from '../../../models/Modules/sales/selectQuantityModel.js';
import { controlStockProductModel } from '../../../models/products/controlStockProductModel.js';

export const insertSalesService = async (
  body,
  id_user
) => {
  try {
    // Desestructuro el body
    const { product, quantity, customerId } = body;

    // Busco el producto
    const seachSaleProduct = await selectProductModel(product);

    // Busco el cliente
    const seachCustomer = await selectCustomerModel(customerId);

    const id_customer = seachCustomer.id_customer;
    //compruebo la cantidad del producto y si hay stock
    const checkQuantity = await controlStockProductModel(
      seachSaleProduct.id_product
    );

    const stock = JSON.parse(JSON.stringify(checkQuantity));

    if (stock < quantity) {
      limitedStock(quantity);
    }

    // colocamos un id de producto ha la venta
    const saleProduct_id = crypto.randomUUID();

    // Insarto el producto en saleProduct
    await insertSaleProductModel(
      saleProduct_id,
      seachSaleProduct.id_product,
      quantity,
      seachSaleProduct.description
    );

    // Obtengo el producto ha lla venta y la cantidad
    const seachQuantity = await selectQuantityModel(
      quantity,
      seachSaleProduct.id_product
    );

    const id_saleProduct = seachQuantity.saleProduct_id;

    // Compluebo si  existen con ese id
    const user = await selectUserByIdModel(id_user);

    if (user.id_user !== id_user) {
      notFoundError('User');
    }

    const saleProduct = await selectProductByIdModel(id_saleProduct);

    if (saleProduct.id_saleProduct !== id_saleProduct) {
      notFoundError('Product');
    }

    const customer = await selectCustomerByIdModel(id_customer);

    if (customer.id_customer !== id_customer) {
      notFoundError('customer');
    }

    // Genero el id
    const id_sale = crypto.randomUUID();
    console.log('inserSalesService', id_customer);

    // Obtenemos la referencia máxima de la tabla Sales
    const maxRef = await getMaxReference5Digits('Sales', 'ref_SL');

    // Generamos la nueva referencia de Sales
    const ref = generateReference5DigitsFromRef('SL', maxRef);

    // Insertamos la venta de producto en la base de datos
    const response = await insertSaleProductModel(
      id_sale,
      ref,
      id_user,
      id_saleProduct,
      id_customer
    );

    // Creamos un id para el modulo
    const moduleId = crypto.randomUUID();
    // Obtenemos la referencia máxima de la tabla Modules
    const maxRefModule = await getMaxReference5Digits('Modules', 'ref_MD') || 'MD-AA00000';

    // Generamos la nueva referencia de Modules
    const refModule = generateReference5DigitsFromRef('MD', maxRefModule);

    const service_type = 'sale';

    // Insertamos el modulo en la base de datos.
    await insertModuleSalesModel(moduleId, refModule, id_user, service_type, id_sale)

    return response;
  } catch (error) {
    handleErrorService(
      error,
      'INSERT_SALES_SERVICE_ERROR',
      'Error al insertar la venta de producto en la base de datos'
    )
  }
};