import { Link, useLocation } from 'react-router-dom';

interface MenuItemProps {
  label: string;
  path: string;
  icon: React.ElementType;
  collapsed: boolean;
}

export const MenuItem = ({
  label,
  path,
  icon: Icon,
  collapsed,
}: MenuItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <li>
      <Link
        to={path}
        className={`flex items-center justify-between gap-2 px-4 py-2 rounded-md hover:bg-gray-100 ${
          isActive ? 'bg-[#ECF3FF] font-semibold text-[#475FFF]' : ''
        }`}
      >
        <div
          className={`flex items-center gap-2 w-full ${collapsed ? 'justify-center' : 'ml-4'}`}
        >
          <Icon size={collapsed ? 25 : 20} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </li>
  );
};
