interface TableLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const TableLayout = ({ title, children }: TableLayoutProps) => {
  return (
    <div className="min-h-screen min-w-full bg-white rounded-lg border border-gray-200 p-6">
      <div className="mx-auto">
        <h1 className="text-2xl text-gray-700 font-semibold mb-8 border-b border-gray-200 pb-4">
          {title}
        </h1>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
