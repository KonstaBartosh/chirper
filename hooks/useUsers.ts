import fetcher from "@/libs/fetcher";
import useSWR from "swr";


const useUsers = () => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR('/api/users', fetcher);

  // Возвращаем объект с данными о пользователе и функцию mutate
  return {
    data,
    error,
    isLoading,  
    mutate
  };
}

export default useUsers;