import { getDBPool } from "../../../db/getPool.js";
import { databaseUpdateError } from "../../../services/error/errorDataBase.js";
import { updateSalesQuantityModel } from "./updateSalesQuantityModel.js";

export const updateSaleProductModel = async (
  saleProduct_id,
  product_id,
  quantity
) => {
  try {
    const pool = await getDBPool();
  
    // Preparar los campos y valores para actualizar
    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    addToUpdate('id_saleProduct', saleProduct_id);
    addToUpdate('product_id', product_id);
    addToUpdate('quantity', quantity);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    const query = `UPDATE SalesProducts SET ${fieldsToUpdate.join(', ')} WHERE id_saleProduct = ?`;
    values.push(saleProduct_id);

    const [result] = await pool.query(query, values);

    // Si no se ha actualizado ningún producto, lanzar un error.
    if (result.affectedRows === 0) {
      databaseUpdateError('No se ha podido actualizar el producto en SalesProducts');
    }

    // Actualizar la cantidad en el stock del producto
    if (quantity !== undefined) {
      return await updateSalesQuantityModel(product_id, quantity);
    }

    return { message: 'Producto de venta actualizado correctamente' };
  } catch (error) {
    databaseUpdateError('Error al actualizar el producto en SalesProducts');
  }
};
