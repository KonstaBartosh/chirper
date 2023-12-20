import fetcher from "@/libs/fetcher";
import useSWR from "swr";


const usePosts = (userId: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';

  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR(url, fetcher);

  // Возвращаем объект с данными о пользователе и функцию mutate
  return {
    data,
    error,
    isLoading,  
    mutate
  };
}

export default usePosts;