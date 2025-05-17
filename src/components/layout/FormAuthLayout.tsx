interface FormAuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const FormAuthLayout = ({ children, title }: FormAuthLayoutProps) => {
  return (
    <div>
      <picture>
        <img src="/shark-logo.svg" alt="logo" className="w-15 h-15" />
      </picture>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};
