import { useCallback, useMemo } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser}  = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list =  currentUser?.folowingIds || [];

    return list.includes(userId);
  }, [currentUser?.folowingIds, userId]);


  const toggleFollow = useCallback(async() =>{
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { data: { userId } });
      } else {
        request = () => axios.post('/api/follow', { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Успешно')
    } catch (error) {
      console.log(error);
      toast.error('Что-то пошло не так!')
    }

  }, [
    currentUser, 
    isFollowing, 
    loginModal, 
    mutateCurrentUser, 
    mutateFetchedUser, 
    userId
  ]);

  return {
    isFollowing,
    toggleFollow
  }
}

export default useFollow;