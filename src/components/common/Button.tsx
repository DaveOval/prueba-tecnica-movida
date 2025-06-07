interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  size = 'md',
  variant = 'primary',
  icon,
}: ButtonProps) => {
  return (
    <button
      className={`
        ${size === 'sm' && 'w-1/2'}
        ${size === 'md' && 'w-full'}
        ${size === 'lg' && 'w-full'}
        ${variant === 'primary' && 'bg-blue-600'}
        ${variant === 'secondary' && 'bg-gray-600'}
        ${variant === 'danger' && 'bg-red-600'}
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
        flex
        items-center
        justify-center
        gap-2
        ${className}
      `}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && icon}
      {children}
    </button>
  );
};
