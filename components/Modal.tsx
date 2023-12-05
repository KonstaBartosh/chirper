import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  actionLabel: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const Modal = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  title,
  actionLabel,
  body,
  footer
}: ModalProps) => {

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    };

    onClose();
  },[disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  },[disabled, onSubmit]);

  if (!isOpen) {
    return;
  }

  return(
    <>
      <div
        className="
          flex
          justify-center
          items-center
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
      >
        <div className="
          relative 
          w-full 
          lg:w-3/6
          my-6 
          mx-auto
          lg:max-w-3xl 
          h-full 
          lg:h-auto
        ">
          {/** content */}
          <div className="
            h-full 
            lg:h-auto 
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col
            w-full
            bg-black
            outline-none
            focus:outline-none
          ">
            {/** Header */}
            <div className="flex items-center justify-between p-10 rounded-t">
              <h3 className="text-3xl text-white font-semibold">{title}</h3>
              <button 
                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition"
                onClick={handleClose}
              >
                <AiOutlineClose size={20}/>
              </button>
            </div>
            {/** Body */}
            <div className="p-10 flex-auto relative">
              {body}
            </div>
            {/** Footer */}
            <div className="flex flex-col p-10 gap-2">
              <Button 
                onClick={handleSubmit} 
                disabled={disabled} 
                label={actionLabel} 
                secondary 
                fullWidth 
                large
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;