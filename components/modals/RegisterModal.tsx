import axios from "axios";
import { useCallback, useState } from "react";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import Input from "../Input";
import Modal from "../Modal";


const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }
    
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsloading(true);

      await axios.post('api/register', {
        email,
        password,
        userName,
        name
      })

      registerModal.onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsloading(false);
    }
  }, [email, name, password, registerModal, userName])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Имя"
        onChange={(evt) => setName(evt.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Никнейм"
        onChange={(evt) => setUserName(evt.target.value)}
        value={userName}
        disabled={isLoading}
      />
      <Input
        placeholder="Email"
        onChange={(evt) => setEmail(evt.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Пароль"
        onChange={(evt) => setPassword(evt.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Уже зарегистрированы? 
        <span 
          className="text-white cursor-pointer hover:opacity-30"
          onClick={onToggle}
        > Войти</span>
      </p>
    </div>
  )

  return(
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      title="Регистрация"
      actionLabel="Зарегистрироваться"
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal;