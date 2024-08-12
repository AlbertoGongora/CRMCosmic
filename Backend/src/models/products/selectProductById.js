import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';

export const selectProductById = async (id_product) => {
  try {
    const pool = await getDBPool();

    // Comprobar si existe un producto con el id proporcionado.
    const [product] = await pool.query(
      `SELECT * FROM Products WHERE id_product = ?`,
      [id_product]
    );

    return product[0];
  } catch (error) {
    databaseQueryError(
      error.message || 'Error en el modelo al obtener el producto por id'
    );
  }
};
