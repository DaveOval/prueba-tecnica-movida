interface AuthButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AuthButton = ({
  children,
  type,
  disabled,
  onClick,
  className = '',
}: AuthButtonProps) => {
  return (
    <button
      className={`
        w-full
        bg-blue-600
        text-white
        font-semibold
        px-4
        py-2
        rounded-lg
        hover:bg-blue-700
        transition
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-blue-300
        hover:cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
