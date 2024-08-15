import { getDBPool } from '../../../db/getPool.js';
import { databaseUpdateError } from '../../../services/error/errorDataBase.js';
import { controlStockProductModel } from '../../products/controlStockProductModel.js';

export const updateSalesQuantityModel = async (product_id, quantity) => {
  try {
    const pool = await getDBPool();
  
    // Actualizo el stock del producto
    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    // Obtengo el stock de la base de datos
    const stock = await controlStockProductModel(product_id);

    // Convierto la info a números
    const numberStock = Number(stock.stock);
    const number = Number(quantity);

    // Restar la cantidad vendida al stock disponible
    const update = numberStock - number;

    addToUpdate('id_product', product_id);
    addToUpdate('stock', update);

    if (fieldsToUpdate.length === 0) return {};

    const query = `UPDATE Products SET ${fieldsToUpdate.join(', ')} WHERE id_product = ?`;
    values.push(product_id);

    const [result] = await pool.query(query, values);

    // Si no se ha actualizado ningún producto, lanzar un error.
    if (result.affectedRows === 0) {
      databaseUpdateError('No se ha podido actualizar el producto');
    }

    return { message: 'Stock actualizado correctamente' };
  } catch (error) {
    databaseUpdateError('Error al actualizar la cantidad del producto en la base de datos');
  }
};
