import { getDBPool } from '../../../db/getPool.js';
import { databaseDeleteError } from '../../../services/error/errorDataBase.js';

export const deleteSaleModel = async (id_sale) => {
  try {
    const pool = await getDBPool();

    // Eliminar las entradas en Modules asociadas con sale_id
    await pool.query('DELETE FROM Modules WHERE sale_id = ?', [id_sale]);

    // Eliminar la entrada en Sales
    const [result] = await pool.query('DELETE FROM Sales WHERE id_sale = ?', [id_sale]);
    
    // Eliminar las entradas en SalesProducts asociadas con sale_id
    await pool.query('DELETE FROM SalesProducts WHERE id_saleProduct = (SELECT saleProduct_id FROM Sales WHERE id_sale = ?)', [id_sale]);

    if (result.affectedRows === 0) {
      databaseDeleteError('No se ha podido eliminar la venta');
    }
  } catch (error) {
    databaseDeleteError(
      error.message || 'Error al eliminar la venta',
      'Error al eliminar la venta'
    );
  }
};
