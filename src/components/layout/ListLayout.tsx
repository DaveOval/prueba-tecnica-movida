interface ListLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const ListLayout = ({ title, children }: ListLayoutProps) => {
  return (
    <div className="min-h-screen flex w-full bg-gray-100">
      <div className="bg-white w-full p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};
