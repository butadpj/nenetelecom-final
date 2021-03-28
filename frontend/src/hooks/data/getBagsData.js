import { useFetch } from "../useFetch";

let bagsUrl = "/api/bags/";

export const getBagsData = () => {
  const { loading, data } = useFetch(bagsUrl);
  let bagsData = data;
  return { loading, bagsData };
};
