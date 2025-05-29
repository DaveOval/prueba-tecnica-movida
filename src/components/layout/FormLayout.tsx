interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl text-gray-700 font-semibold mb-8">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
      </div>
    </div>
  );
};
