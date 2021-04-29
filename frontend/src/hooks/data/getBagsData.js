import { useFetch } from "../useFetch";

let bagsUrl = "bags";

export const getBagsData = () => {
  const { loading, data } = useFetch(bagsUrl);
  let bagsData = data;
  return { loading, bagsData };
};
