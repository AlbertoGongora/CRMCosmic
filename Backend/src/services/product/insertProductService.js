import { getMaxReference5Digits } from '../../models/getMaxReference.js';
import { insertProductModel } from '../../models/products/insertProductModel.js';
import { generateReference5DigitsFromRef } from '../../utils/generateReference5Digits.js';
import { handleErrorService } from '../../utils/handleError.js';

export const insertProductService = async (body) => {
  try {
    // Obtenemos el cuerpo de los productos
    const { name, description, price, stock, active } = body;

    const id_product = crypto.randomUUID();

    // Obtenemos la referencia máxima de la tabla Products
    const maxRef = await getMaxReference5Digits('Products', 'ref_PR');

    // Generamos la nueva referencia de Products
    const ref = generateReference5DigitsFromRef('PR', maxRef);

    await insertProductModel(
      id_product,
      ref,
      name,
      description,
      price,
      stock,
      active
    );
  } catch (error) {
    handleErrorService(
      error,
      'NEW_PRODUCT_SERVICE_ERROR',
      'Error al insertar el producto desde el servicio'
    );
  }
};
