import { useFetch } from "../useFetch";

let bagItemUrl = "bag-item";

export const getBagItemData = () => {
  const { loading, data } = useFetch(bagItemUrl);

  let bagItemData = data;

  return { loading, bagItemData };
};
