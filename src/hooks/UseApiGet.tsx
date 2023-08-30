import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useApiGet = (queryKey: string, endpoint: string) => {
  const fetchGetReq = () => {
    try {
      return axios.get(endpoint);
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
