import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <aside className="flex min-h-screen w-full">
      <div className="flex flex-col flex-1 w-full">
        <main className="flex-1 w-full overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="max-w-full mx-auto">{children || <Outlet />}</div>
        </main>
      </div>
    </aside>
  );
};
