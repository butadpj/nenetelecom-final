import GetCurrentCustomer from "../GetCurrentCustomer";
import { getProducts } from "../query/getProducts";
import { getOrdersData } from "../data/getOrdersData";
import { getOrderProductData } from "../data/getOrderProductData";

export const getCustomerOrderProduct = () => {
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { products } = getProducts();
  const { ordersData } = getOrdersData();
  const { orderProductData } = getOrderProductData();

  let customerOrder = ordersData.filter(
    (data) => data.customer === djangoCurrentCustomerId
  );

  let completedCustomerOrder = customerOrder.filter(
    (data) => data.complete === true
  );

  let notCompletedCustomerOrder = customerOrder.filter(
    (data) => data.complete === false
  );

  let completedCustomerOrderProduct = [];

  let customerOrderProduct = [];
  let total_items;
  let total_price;

  orderProductData.forEach((data) => {
    customerOrder.forEach((order) => {
      if (order.complete === false) {
        if (data.order === order.transaction_id) {
          customerOrderProduct.push(data);
          total_items = order.total_cart_items;
          total_price = order.total_cart_price;
        }
      } else {
        if (data.order === order.transaction_id) {
          completedCustomerOrderProduct.push(data);
          total_items = order.total_cart_items;
          total_price = order.total_cart_price;
        }
      }
    });
  });

  let completedCustomerOrderProductDisplay = [];
  completedCustomerOrderProduct.forEach((item) => {
    products.map((product) => {
      if (product.id === item.product) {
        product.quantity = item.quantity;
        item.product = [product];
      }
    });
    completedCustomerOrderProductDisplay.push(item);
  });

  let completedCustomerOrderDisplay = [];
  completedCustomerOrder.forEach((order) => {
    order.order_product = [];
    completedCustomerOrderProduct.map((item) => {
      if (item.order === order.transaction_id) {
        order.order_product.push(item);
      }
    });
    completedCustomerOrderDisplay.push(order);
  });

  return {
    customerOrder,
    customerOrderProduct,
    completedCustomerOrder,
    completedCustomerOrderProduct,
    completedCustomerOrderProductDisplay,
    completedCustomerOrderDisplay,
    notCompletedCustomerOrder,
    total_items,
    total_price,
  };
};
