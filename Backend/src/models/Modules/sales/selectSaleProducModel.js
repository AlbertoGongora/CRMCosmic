import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectSaleProducModel = async (id_sale) => {
  try {
    const pool = getDBPool();

    const [result] = await pool.query(`SELECT * FROM Sales WHERE id_sale = ?`, [
      id_sale,
    ]);

    // Manejo de error si no se encuentra la venta
    if (!result || result.length === 0) {
      notFoundError('Venta');
    }

    return result[0];
  } catch (error) {
    // Manejo de error de consulta a la base de datos
    databaseQueryError(error.message || 'Error al buscar la venta en la base de datos');
  }
};
