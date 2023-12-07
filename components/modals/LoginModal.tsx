import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsloading(true);

      // TODO: Добавить фактическую логику входа здесь

      // Закрыть модальное окно после входа в систему
      loginModal.onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsloading(false);
    }
  }, [loginModal])

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
        onChange={(evt) => setPassword(evt.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  return(
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      title="Логин"
      actionLabel="Зарегистрироваться"
      body={bodyContent}
    />
  )
}

export default LoginModal;