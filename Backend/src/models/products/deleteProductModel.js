import { getDBPool } from '../../db/getPool.js';
import { databaseDeleteError } from '../../services/error/errorDataBase.js';

export const deleteProductModel = async (id_product) => {
  try {
    const pool = await getDBPool();
    const [result] = await pool.query(
      `DELETE FROM Products
            WHERE id_product = ?;
            `,
      [id_product]
    );

    if (result.affectedRows === 0) {
      const error = new Error('No se ha podido eliminar el producto.');
      error.code = 'DELETE_PRODUCTS_ERROR';
      throw error;
    }

    return { message: 'Producto eliminado correctamente' };
  } catch (error) {
    databaseDeleteError(
      error.message || 'Error en el modelo al eliminiar un producto'
    );
  }
};
