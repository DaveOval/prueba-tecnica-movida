import { Link } from 'react-router-dom';
import { IconAdd } from '../../assets/icons';

interface TableLayoutProps {
  title: string;
  children: React.ReactNode;
  route: string;
}

export const TableLayout = ({ title, children, route }: TableLayoutProps) => {
  return (
    <div className="min-h-screen bg-white rounded-lg border border-gray-200 p-6">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl text-gray-700 font-semibold">{title}</h1>
          <Link to={route}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 cursor-pointer">
              Agregar
              <IconAdd size={15} style={{ color: 'white' }} />
            </button>
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
