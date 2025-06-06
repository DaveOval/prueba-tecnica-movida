interface InputSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  options: { label: string; value: string; selected?: boolean }[];
}

export const InputSelect = ({
  label,
  id,
  placeholder = 'Selecciona una opción',
  required,
  error,
  options = [],
  ...props
}: InputSelectProps) => {
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
      <select
        id={id}
        required={required}
        className={`block w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.selected}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
