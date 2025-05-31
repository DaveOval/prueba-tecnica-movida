import { Link } from 'react-router-dom';

import { useAppSelector, useIsMobile } from '../../hooks';
import { nameApp } from '../../config';
import { menuOptions } from '../../consts/menuOptions';
import { MenuSection } from './MenuSection';

const Sidebar = () => {
  const isMobile = useIsMobile();

  const isAsideOpen = useAppSelector((state) => state.ui.isAsideOpen);

  return (
    <aside
      className={`${
        isMobile
          ? isAsideOpen
            ? 'w-64 translate-x-0 fixed top-16 h-[calc(100vh-4rem)] shadow-2xl'
            : '-translate-x-full fixed top-16 h-[calc(100vh-4rem)]'
          : isAsideOpen
            ? 'w-64 shadow-2xl'
            : 'w-20'
      } bg-[#FFFEFE] border-r border-gray-200 overflow-hidden transition-all duration-300 ease-in-out`}
    >
      <section
        className={`flex flex-row items-center py-7 gap-1 border-b border-gray-200 mb-4 ${!isAsideOpen && 'justify-center'}`}
      >
        <Link to="/" className="flex flex-row items-center gap-2">
          <picture className={`${isAsideOpen && 'pl-3'}`}>
            <img src="/logo.svg" className="w-13 h-13" />
          </picture>
          {isAsideOpen && (
            <h2 className="text-2xl font-semibold">{nameApp || 'CRM'}</h2>
          )}
        </Link>
      </section>
      <nav className="flex flex-col gap-4">
        {menuOptions.map((section) => (
          <MenuSection
            key={section.title}
            section={section}
            collapsed={!isAsideOpen}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
