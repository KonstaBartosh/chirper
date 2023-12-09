import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  // Используем хук useSWR для получения данных о текущем пользователе из API
  const { data, error, isLoading, mutate } = useSWR( 'api/current', fetcher);

  // Возвращаем объект с данными о пользователе и функцию mutate
  return {
    data,        // Данные текущего пользователя
    error,       // Ошибка, если запрос завершился неудачно
    isLoading,   // Флаг, указывающий на загрузку данных
    mutate       // Функция для мутации (обновления) данных
  };
}

export default useCurrentUser;
