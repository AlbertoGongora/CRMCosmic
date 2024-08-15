import { getDBPool } from "../../../db/getPool.js";
import { databaseQueryError } from "../../../services/error/errorDataBase.js";
import { notFoundError } from "../../../services/error/errorService.js";

export const selectProductIsSaleProductModel = async (saleProduct_id) => {
  try {
    const pool = getDBPool();

    const [result] = await pool.query(
      `SELECT * FROM SalesProducts WHERE id_saleProduct = ?`,
      [saleProduct_id]
    );

    // Manejo de error si no se encuentra el SalesProduct
    if (!result || result.length === 0) {
      notFoundError('SalesProducts');
    }

    return result[0];
  } catch (error) {
    // Manejo de error de consulta a la base de datos
    databaseQueryError('Error al buscar el producto de la venta en la base de datos');
  }
};
