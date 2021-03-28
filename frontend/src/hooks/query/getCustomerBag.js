import GetCurrentCustomer from "../GetCurrentCustomer";
import { getBagsData } from "../data/getBagsData";
import { getBagItemData } from "../data/getBagItemData";

export const getCustomerBag = () => {
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { bagsData } = getBagsData();
  const { bagItemData } = getBagItemData();

  let customerBag = bagsData.filter(
    (data) => data.customer === djangoCurrentCustomerId
  );

  let customerBagItem = [];

  let total_items;
  let total_price;

  bagItemData.forEach((data) => {
    customerBag.forEach((order) => {
      if (data.bag === order.id) {
        customerBagItem.push(data);
        total_items = order.total_cart_items;
        total_price = order.total_cart_price;
      }
    });
  });

  return {
    customerBag,
    customerBagItem,
    total_items,
    total_price,
  };
};
