interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder: string;
  required: boolean;
  error?: string;
  type?: string;
}

export const Input = ({
  label,
  id,
  placeholder,
  required,
  error,
  type = 'text',
  ...props
}: InputProps) => {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        <span className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </span>
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`block w-full rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } bg-white text-gray-900 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500`}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
