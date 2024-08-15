import { getDBPool } from '../../../db/getPool.js';
import { databaseDeleteError } from '../../../services/error/errorDataBase.js';

export const deleteSaleModel = async (id_sale) => {
  try {
    const pool = await getDBPool();

    // Eliminar las entradas en Modules asociadas con sale_id
    const [modulesResult] = await pool.query('DELETE FROM Modules WHERE sale_id = ?', [id_sale]);
    if (modulesResult.affectedRows === 0) {
      databaseDeleteError('No se ha podido eliminar los módulos asociados con la venta.');
    }

    // Eliminar la entrada en Sales
    const [salesResult] = await pool.query('DELETE FROM Sales WHERE id_sale = ?', [id_sale]);
    if (salesResult.affectedRows === 0) {
      databaseDeleteError('No se ha podido eliminar la venta.');
    }

    // Eliminar las entradas en SalesProducts asociadas con sale_id
    const [salesProductsResult] = await pool.query('DELETE FROM SalesProducts WHERE id_saleProduct = (SELECT saleProduct_id FROM Sales WHERE id_sale = ?)', [id_sale]);
    if (salesProductsResult.affectedRows === 0) {
      databaseDeleteError('No se han podido eliminar los productos asociados con la venta.');
    }

    return { message: 'Venta eliminada correctamente' };
  } catch (error) {
    databaseDeleteError(error.message || 'Error al eliminar la venta');
  }
};
