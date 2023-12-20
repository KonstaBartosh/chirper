import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import { set } from "date-fns";
import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form = ({ 
  placeholder, 
  isComment, 
  postId}: FormProps
  ) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await axios.post('/api/posts', { body });

      setBody('');
      mutatePosts();
    } catch (error) {
      console.log(error);
      toast.error('Что-то пошло не так!');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return(
    <div className="border-b border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id}  />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              value={body}
              onChange={(evt) => setBody(evt.target.value)}
              placeholder={placeholder}
              className=" 
                disabled:opacity-80 
                peer 
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-xl 
                text-white"
            >
            </textarea>
            <div className="my-4 flex justify-end">
              <Button
                disabled={!body || isLoading}
                label="Поделиться"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-center text-2xl mb-4 font-bold">
            Добро пожаловать в Chirper
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Логин" onClick={loginModal.onOpen}/>
            <Button label="Регистрация" onClick={registerModal.onOpen} secondary/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Form;