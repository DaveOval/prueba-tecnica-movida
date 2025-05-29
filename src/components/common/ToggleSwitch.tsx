interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  title?: string;
  required?: boolean;
  error?: string;
}

export const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  title = '',
  required = false,
  error,
}: ToggleSwitchProps) => {
  return (
    <div className="w-fit mb-4">
      {title && (
        <label className="block mb-1 text-sm font-medium text-gray-700 ">
          {title}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <label className="flex items-center space-x-2 cursor-pointer select-none">
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`
                w-10 h-6 rounded-full transition-colors duration-200
                ${
                  disabled
                    ? 'bg-gray-200'
                    : checked
                      ? 'bg-blue-600 '
                      : 'bg-gray-300'
                }
              `}
          />
          <div
            className={`
                absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200
                ${checked ? 'translate-x-4' : ''}
                ${disabled ? 'opacity-70' : ''}
              `}
          />
        </div>
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
