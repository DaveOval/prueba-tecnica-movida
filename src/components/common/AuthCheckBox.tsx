import React from 'react';

interface AuthCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
}

export const AuthCheckBox = ({
  label,
  id,
  required = false,
  error,
  ...props
}: AuthCheckBoxProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={id}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-blue-300 bg-white transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100"
            required={required}
            {...props}
          />
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-light dark:text-text-dark cursor-pointer select-none flex items-center"
        >
          <span className="flex items-center gap-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1.5 ml-7">{error}</p>}
    </div>
  );
};
