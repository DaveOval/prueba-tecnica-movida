interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};
