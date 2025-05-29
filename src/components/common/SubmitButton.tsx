interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
}

export const SubmitButton = ({
  loading = false,
  label = 'Submit',
  disabled,
  ...props
}: SubmitButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`
          w-full rounded-lg px-4 py-2 text-sm font-medium text-white
          transition-colors duration-200 focus:outline-none
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-100
          ${isDisabled ? 'bg-blue-400 cursor-not-allowed opacity-60' : 'bg-blue-600 hover:bg-blue-700'}
        `}
      {...props}
    >
      {loading ? 'Enviando...' : label}
    </button>
  );
};
