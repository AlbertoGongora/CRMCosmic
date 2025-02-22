import { getDBPool } from '../../../db/getPool.js';
import { databaseQueryError } from '../../../services/error/errorDataBase.js';

export const selectInvoiceListModel = async () => {
  try {
    const pool = getDBPool();

    // Obtener todas las facturas
    const result =
      await pool.query(`SELECT Invoices.ref_IN, Invoices.id_invoice, Invoices.sale_id AS codigo_venta, Users.name AS agent_name, Users.last_name AS agent_Last_name, Products.name AS product, Products.price AS product_price, SalesProducts.quantity AS quantity, Customers.name AS customer_name, Invoices.company_name, Invoices.NIF, Invoices.address, Invoices.total_price, Invoices.including_tax, Invoices.total_amount, Invoices.payment_method, Invoices.invoice_status, Invoices.due_date, Invoices.creation_at, Invoices.update_at, Sales.ref_SL
      FROM Invoices
      LEFT JOIN Users ON Invoices.agentUser_id = Users.id_user
      LEFT JOIN Sales ON Invoices.sale_id = Sales.id_sale
      LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
      LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
      LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer 
      ORDER BY Invoices.ref_IN DESC`);

    return result[0];
  } catch (error) {
    databaseQueryError('Error en el modelo al obtener la lista de factura');
  }
};
