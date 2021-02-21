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

  let notCompletedCustomerOrder = customerOrder.filter(
    (data) => data.complete === false
  );

  let customerOrderProduct = [];
  let total_items;
  let total_price;
  orderProductData.forEach((data) => {
    notCompletedCustomerOrder.forEach((order) => {
      if (data.order === order.transaction_id) {
        customerOrderProduct.push(data);
        total_items = order.total_cart_items;
        total_price = order.total_cart_price;
      }
    });
  });

  return {
    customerOrder,
    customerOrderProduct,
    notCompletedCustomerOrder,
    total_items,
    total_price,
  };
};
