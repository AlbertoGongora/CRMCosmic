import { getDBPool } from "../../../db/getPool.js";
import { databaseQueryError } from "../../../services/error/errorDataBase.js";
import { notFoundError } from "../../../services/error/errorService.js";


export const selectSalesByIdModel = async (id) => {
  try {
    const pool = await getDBPool();
    const query = 'SELECT * FROM Sales WHERE id_sale = ?';
    const [rows] = await pool.query(query, [id]);

    // Verificar si se encontraron resultados
    if (!rows || rows.length === 0) {
      notFoundError('Venta');
    }

    return rows[0];
  } catch (error) {
    // Manejo de errores con un error específico para consultas a la base de datos
    databaseQueryError(error.message || 'Error al obtener la venta por ID desde el modelo');
  }
};
