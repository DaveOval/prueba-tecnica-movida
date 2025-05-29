interface TableLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const TableLayout = ({ title, children }: TableLayoutProps) => {
  return (
    <div className="min-h-screen min-w-full bg-white rounded-lg border border-gray-200 p-6">
      <div className="mx-auto">
        <h1 className="text-2xl text-gray-700 font-semibold mb-8">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
      </div>
    </div>
  );
};
