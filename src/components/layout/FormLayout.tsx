import { Link } from 'react-router-dom';
import { IconBack } from '../../assets/icons';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
  linkBack?: string;
}

export const FormLayout = ({ title, children, linkBack }: FormLayoutProps) => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-gray-700 font-semibold mb-8">{title}</h1>
          {linkBack && (
            <Link
              to={linkBack}
              className="flex items-center gap-2 text-gray-700"
            >
              <IconBack size={18} />
              Ir atras
            </Link>
          )}
        </div>
        <div className="gap-6">{children}</div>
      </div>
    </div>
  );
};
