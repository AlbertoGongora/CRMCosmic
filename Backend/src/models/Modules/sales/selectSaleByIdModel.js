import { getDBPool } from "../../../db/getPool.js";
import { databaseQueryError } from "../../../services/error/errorDataBase.js";
import { notFoundError } from "../../../services/error/errorService.js";

export const selectSaleByIdModel = async (id_sale) => {
  try {
    const pool = await getDBPool();

    const [result] = await pool.query(
      `SELECT * FROM Sales WHERE id_sale = ?`,
      [id_sale]
    );

    // Verificar si no se encontró ninguna venta
    if (result.length === 0) {
      notFoundError('Venta no encontrada.');
    }

    return result[0];
  } catch (error) {
    databaseQueryError(error.message || 'Error al seleccionar la venta por ID');
  }
};
