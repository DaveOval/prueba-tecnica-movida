interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-row bg-gray-100">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-12 rounded-l-2xl shadow-lg">
        {children}
      </div>
      <div className="flex-1 hidden md:block overflow-hidden rounded-r-2xl">
        <img
          src="./auth.webp"
          alt="log in or sign in"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};
