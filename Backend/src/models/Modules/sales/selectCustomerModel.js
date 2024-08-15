import { getDBPool } from "../../../db/getPool.js";
import { databaseQueryError } from "../../../services/error/errorDataBase.js";
import { notFoundError } from "../../../services/error/errorService.js";

export const selectCustomerModel = async (customer) => {
  try {
    const pool = await getDBPool();

    const [result] = await pool.query(
      `SELECT * FROM Customers WHERE id_customer = ?`,
      [customer]
    );

    if (!result || result.length === 0) {
      notFoundError('Cliente no encontrado');
    }

    return result[0];
  } catch (error) {
    databaseQueryError('Error al seleccionar el cliente en la base de datos');
  }
};
