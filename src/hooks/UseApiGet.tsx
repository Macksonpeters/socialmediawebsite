import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useApiGet = (queryKey: string, endpoint: string) => {
  const token = "86134fdad6b04e31823ac5fb4f187815";

  const fetchGetReq = () => {
    try {
      return axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // useQuery api get req

  const { data, isLoading, error, refetch, isFetching } = useQuery(
    [queryKey],
    fetchGetReq
  );

  return { data, isLoading, error, refetch, isFetching };
};

export default useApiGet;
