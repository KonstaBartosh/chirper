import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsloading(true);
      signIn('credentials', { email, password });
      loginModal.onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsloading(false);
    }
  }, [email, loginModal, password])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(evt) => setEmail(evt.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Пароль"
        type="password"
        onChange={(evt) => setPassword(evt.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Впервые здесь? 
        <span 
          className="text-white cursor-pointer hover:opacity-30"
          onClick={onToggle}
        > Регистрация</span>
      </p>
    </div>
  )

  return(
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      title="Логин"
      actionLabel="Войти"
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal;