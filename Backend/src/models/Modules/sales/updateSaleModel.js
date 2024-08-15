import { getDBPool } from "../../../db/getPool.js";
import { databaseUpdateError } from "../../../services/error/errorDataBase.js";


export const updateSaleModel = async (id_sale, saleProduct_id, customer) => {
  try {
    const pool = await getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    addToUpdate('saleProduct_id', saleProduct_id);
    addToUpdate('customer_id', customer);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    const query = `UPDATE Sales SET ${fieldsToUpdate.join(', ')} WHERE id_sale = ?`;
    values.push(id_sale);

    const [result] = await pool.query(query, values);

    // Si no se ha actualizado ninguna fila, lanzar un error.
    if (result.affectedRows === 0) {
      databaseUpdateError('No se ha podido actualizar la venta.');
    }

    return { message: 'Venta actualizada correctamente' };
  } catch (error) {
    databaseUpdateError('Error al actualizar la venta en la base de datos');
  }
};
