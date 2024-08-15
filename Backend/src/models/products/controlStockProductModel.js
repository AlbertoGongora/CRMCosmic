import { getDBPool } from '../../db/getPool.js';
import { databaseQueryError } from '../../services/error/errorDataBase.js';


// SI LO ENCUENTRAS VERIFICA EL NOMBRE

export const controlStockProductModel = async (product_id) => {
  try {
    const pool = await getDBPool();

    const [result] = await pool.query(
      `SELECT name, stock  FROM Products WHERE id_product = ?`,
      [product_id]
    );

    return result[0];
  } catch (error) {
    databaseQueryError(
      'Error en el modelo al obtener el cantidad del producto'
    );
  }
};
