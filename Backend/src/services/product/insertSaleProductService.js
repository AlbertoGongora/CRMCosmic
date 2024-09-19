import { controlStockProductModel } from '../../models/products/controlStockProductModel.js';
import { insertSaleProductModel } from '../../models/products/insertSaleProductModel.js';
import { handleErrorService } from '../../utils/handleError.js';
import { limitedStock } from '../error/errorService.js';
import { selectSaleProductByIdService } from './selectSaleProductByIdService.js';

export const insertSaleProductService = async (body, productId) => {
  try {
    const { quantity, description } = body;

    // Comprobar si existe un producto con el id proporcionado.
    const hasProduct = await selectSaleProductByIdService(productId);

    // Si no se encuentra el producto, lanzar un error.
    if (hasProduct === null) {
      notFoundError('Producto');
    }

    //compruebo la cantidad del producto y si hay stock
    const checkQuantity = await controlStockProductModel(productId);
    const stock = JSON.parse(JSON.stringify(checkQuantity));

    if (stock < quantity) {
      limitedStock(quantity);
    }

    // colocamos un id de venta
    const saleProduct_id = crypto.randomUUID();

    // Inserto la venta del producto en la base de datos
    await insertSaleProductModel(
      saleProduct_id,
      productId,
      quantity,
      description
    );

    return checkQuantity;
  } catch (error) {
    handleErrorService(
      error,
      'INSERT_PRODUCT_SALE_SERVICE_ERROR',
      'Error al incertar la venta de producto desde el servicio'
    );
  }
};
