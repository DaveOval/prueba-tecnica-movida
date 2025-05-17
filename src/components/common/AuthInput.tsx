import { useState } from 'react';

import { IconEyeOff, IconEye } from '../../assets/icons';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  required: boolean;
  error?: string;
}

export const AuthInput = ({
  label,
  type,
  id,
  placeholder,
  required,
  error,
  ...props
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-text-light dark:text-text-dark"
      >
        <span className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </span>
      </label>

      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          id={id}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-gray-900 placeholder-gray-400 transition"
          placeholder={placeholder}
          required={required}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? (
              <IconEyeOff
                size={20}
                style={{ color: '#000000', cursor: 'pointer' }}
              />
            ) : (
              <IconEye
                size={20}
                style={{ color: '#000000', cursor: 'pointer' }}
              />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
