import { IconProps } from './IconProps';

export const IconFileText = ({ size, style }: IconProps) => {
  return (
    <div style={style}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M553.89 875.24c0.15-0.02 0.29-0.05 0.44-0.07l-0.19-0.19-0.25 0.26z"
          fill="currentColor"
        />
        <path
          d="M877.72 658.29V109.71H292.58v109.71h-146.3v438.86H73.14v256h877.71v-256h-73.13z m-73.14-475.43v475.43H637.99c-25.34 43.54-71.99 73.14-126 73.14s-100.66-29.6-126-73.14h-20.28V182.86h438.87zM219.43 292.57h73.14v365.71h-73.14V292.57z m658.28 548.57H146.28V731.43h202.97c41.2 45.9 100.38 73.14 162.75 73.14 62.36 0 121.55-27.24 162.75-73.14h202.97v109.71z"
          fill="currentColor"
        />
        <path
          d="M402.28 292.57h365.71v73.14H402.28zM402.28 438.86h365.71V512H402.28z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
