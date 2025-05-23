import { MenuItem } from './MenuItem';
import { MenuSection as MenuSectionType } from '../../consts/menuOptions';

interface MenuSectionProps {
  section: MenuSectionType;
  collapsed: boolean;
}

export const MenuSection = ({ section, collapsed }: MenuSectionProps) => {
  return (
    <div>
      {!collapsed && (
        <h4 className="text-xs uppercase text-gray-500 font-semibold px-4 mb-2">
          {section.title}
        </h4>
      )}
      <ul className="space-y-1">
        {section.items.map((item) => (
          <MenuItem key={item.label} {...item} collapsed={collapsed} />
        ))}
      </ul>
    </div>
  );
};
