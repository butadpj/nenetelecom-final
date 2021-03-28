import GetCurrentCustomer from "../GetCurrentCustomer";
import { getOrdersData } from "../data/getOrdersData";
import { getOrderProductData } from "../data/getOrderProductData";
import { getProducts } from "../query/getProducts";

export const getCustomerOrder = () => {
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { products } = getProducts();
  const { ordersData } = getOrdersData();
  const { orderProductData } = getOrderProductData();

  let customerOrder = ordersData.filter(
    (data) => data.customer === djangoCurrentCustomerId
  );

  let total_items;
  let total_price;

  let customerOrderProduct = [];
  orderProductData.forEach((data) => {
    customerOrder.forEach((order) => {
      if (data.order === order.transaction_id) {
        customerOrderProduct.push(data);
        total_items = order.total_cart_items;
        total_price = order.total_cart_price;
      }
    });
  });

  let customerOrderDisplay = [];
  customerOrder.forEach((order) => {
    order.order_products = [];
    customerOrderProduct.map((item) => {
      if (item.order === order.transaction_id) {
        order.order_products.push(item);
      }
    });
    customerOrderDisplay.push(order);
  });

  let customerOrderProductDisplay = [];
  customerOrderProduct.forEach((item) => {
    products.map((product) => {
      if (product.id === item.product) {
        product.quantity = item.quantity;
        item.product = product;
      }
    });
    customerOrderProductDisplay.push(item);
  });

  return {
    customerOrder,
    customerOrderProduct,
    customerOrderDisplay,
    customerOrderProductDisplay,
  };
};
