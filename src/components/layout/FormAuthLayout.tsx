interface FormAuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const FormAuthLayout = ({
  children,
  title,
  description,
}: FormAuthLayoutProps) => {
  return (
    <div className="flex flex-col justify-center h-screen w-full max-w-md mx-auto">
      <picture className="bg-background-light dark:bg-background-dark mb-4">
        <img src="/logo.svg" alt="logo" className="w-15 h-15" />
      </picture>
      <h2 className="text-4xl font-semibold mb-2">{title}</h2>
      <p className="text-lg text-gray-400 mb-10">{description}</p>
      {children}
    </div>
  );
};
