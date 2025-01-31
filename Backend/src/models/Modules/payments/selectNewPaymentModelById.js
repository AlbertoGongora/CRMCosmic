import { getDBPool } from "../../../db/getPool.js";
import { databaseQueryError } from "../../../services/error/errorDataBase.js";

export const selectNewPaymentModelById = async (payment_id) => {
   try {
    const pool = await getDBPool();
   // Hacemos la peticion del nuevo pago para resolverlo en el visualizador
    const selectQuery = `
      SELECT Payments.id_payment,
         Invoices.id_invoice,
         Invoices.ref_IN,
         Invoices.agentUser_id AS salesAgent,
         Customers.name AS customer,
         Customers.email AS customer_email,
         Customers.phone AS customer_phone,
         Customers.company_name,
         Invoices.total_amount AS paid_amount, 
         Payments.ref_PM,
         Payments.payment_status,
         Payments.payment_date,
         Payments.create_at,
         Payments.update_at
      FROM Payments
      LEFT JOIN Invoices ON Payments.invoice_id = Invoices.id_invoice
      LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer
      WHERE Payments.id_payment = ?
      `;
      const [paymentResult] = await pool.query(selectQuery, [payment_id]);


      return paymentResult[0];
} catch (error) {
    databaseQueryError('Error en el modelo al obtener el pago');
  }
}
