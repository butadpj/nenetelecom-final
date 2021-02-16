import GetCurrentCustomer from "../GetCurrentCustomer";
import { getOrdersData } from "../data/getOrdersData";
import { getOrderProductData } from "../data/getOrderProductData";

export const getCustomerOrderProduct = () => {
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { ordersData } = getOrdersData();
  const { orderProductData } = getOrderProductData();

  let customerOrder = ordersData.filter(
    (data) => data.customer === djangoCurrentCustomerId
  );

  let customerOrderProduct = [];
  let total_items;
  let total_price;
  orderProductData.forEach((data) => {
    customerOrder.forEach((order) => {
      if (data.order === order.transaction_id) {
        customerOrderProduct.push(data);
        total_items = order.total_cart_items;
        total_price = order.total_cart_price;
      }
    });
  });

  return { customerOrder, customerOrderProduct, total_items, total_price };
};
