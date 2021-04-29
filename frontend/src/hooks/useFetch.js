import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const response = await fetch(`/api/v1/${url}/`);
      const data = await response.json();
      if (isMounted) {
        setData(data);
        setLoading(false);
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { loading, data };
};
