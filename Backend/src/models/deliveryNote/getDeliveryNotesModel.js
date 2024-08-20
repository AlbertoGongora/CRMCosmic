import { getDBPool } from "../../db/getPool.js";
import { databaseQueryError } from "../../services/error/errorDataBase.js";
import { notFoundError } from "../../services/error/errorService.js";


// Define la función para seleccionar notas de entrega
export const getDeliveryNotesModel = async () => {
  try {
    const pool = getDBPool();

    // Realiza la consulta a la base de datos para obtener las notas de entrega
    const [result] = await pool.query(`
      SELECT 
        DeliveryNotes.id_note, 
        DeliveryNotes.sale_id,
        DeliveryNotes.ref_DN, 
        Users.name AS deliverer, 
        Users.last_name AS deliverer_last_name,  
        Addresses.address AS delivery_address, 
        Addresses.number AS address_number, 
        Addresses.floor AS address_floor,
        Addresses.letter_number AS address_letter_number, 
        Addresses.city AS address_city, 
        Addresses.zip_code AS address_zip_code, 
        Addresses.country AS address_country, 
        Products.name AS product_name, 
        Products.description AS product_description, 
        SalesProducts.quantity AS product_quantity, 
        DeliveryNotes.delivery_status, 
        DeliveryNotes.delivery_date, 
        DeliveryNotes.create_at, 
        DeliveryNotes.update_at,
        Customers.name AS customer_name, 
        Customers.email AS customer_email, 
        Customers.phone AS customer_phone,
        Customers.company_name,
        Sales.ref_SL,
        Sales.operation_status
      FROM 
        DeliveryNotes
      LEFT JOIN 
        Users ON DeliveryNotes.deliverer_id = Users.id_user
      LEFT JOIN 
        Addresses ON DeliveryNotes.address_id = Addresses.id_address
      LEFT JOIN 
        SalesProducts ON DeliveryNotes.saleProduct_id = SalesProducts.id_saleProduct
      LEFT JOIN 
        Products ON SalesProducts.product_id = Products.id_product
      LEFT JOIN
        Customers ON DeliveryNotes.customer_id = Customers.id_customer
      LEFT JOIN
        Sales ON DeliveryNotes.sale_id = Sales.id_sale;
    `);

    // Verificar si se encontraron resultados
    if (!result || result.length === 0) {
      notFoundError('Notas de entrega');
    }

    // Devuelve el resultado de la consulta
    return result;
  } catch (error) {
    // Manejo de errores con un error específico para consultas a la base de datos
    databaseQueryError(error.message || 'Error al obtener las notas de entrega desde el modelo');
  }
};
