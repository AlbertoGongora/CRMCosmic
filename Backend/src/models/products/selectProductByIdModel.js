import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectProductByIdModel = async (productId) => {
  try {
    const pool = await getDBPool();

    // Comprobar si existe un producto con el id proporcionado.
    const [product] = await pool.query(
      `SELECT * FROM Products WHERE id_product = ?`,
      [productId]
    );

    // Verificar si se encontraron resultados
    if (!product || product.length === 0) {
      return null;
    }

    return product[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al obtener el producto por id'
    );
  }
};
