import { IconProps } from './IconProps';

export const IconBoxes = ({ size, style }: IconProps) => {
  return (
    <div style={style}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="4"
          width="8"
          height="8"
          rx="1.8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4 13.8C4 12.8059 4.80589 12 5.8 12H10.2C11.1941 12 12 12.8059 12 13.8V20H5.8C4.80589 20 4 19.1941 4 18.2V13.8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 13.8C12 12.8059 12.8059 12 13.8 12H18.2C19.1941 12 20 12.8059 20 13.8V18.2C20 19.1941 19.1941 20 18.2 20H12V13.8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 12V15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 12V15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 4V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
