interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  value,
  placeholder,
  disabled,
  onChange
}: InputProps) => {
  return(
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className="
        w-full 
        p-4
        bg-black 
        text-white 
        text-lg 
        border-2 
        border-neutral-800 
        rounded-md
        outline-none
        focus:border-sky-500
        focus:border-2
        transition
        disabled:bg-neutral-900
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    />
  )
}

export default Input;