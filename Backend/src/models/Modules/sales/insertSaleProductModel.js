import { getDBPool } from '../../../db/getPool.js';
import { databaseInsertError } from '../../../services/error/errorDataBase.js';

export const insertSaleProductModel = async (
  id_sale,
  ref,
  id_user,
  id_saleProduct,
  id_customer
) => {
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

    addToUpdate('id_sale', id_sale);
    addToUpdate('ref_SL', ref);
    addToUpdate('user_id', id_user);
    addToUpdate('saleProduct_id', id_saleProduct);
    addToUpdate('customer_id', id_customer);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const query = `INSERT INTO Sales (${fieldsToUpdate.join(', ')}) VALUES (?,?,?,?,?)`;
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError('No se ha podido insertar la venta.');
    }

    return { message: 'Venta creada correctamente' };
  } catch (error) {
    databaseInsertError(error.message || 'Error al insertar la venta en la base de datos.');
  }
};
