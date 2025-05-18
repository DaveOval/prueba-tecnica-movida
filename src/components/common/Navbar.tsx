import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks';
import { toggleAside } from '../../store/slices/uiSlice';

import {
  IconArrowDown,
  IconClose,
  IconMenu,
  IconUser,
} from '../../assets/icons';
import { IconNotification } from '../../assets/icons/IconNotification';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const isAsideOpen = useAppSelector((state) => state.ui.isAsideOpen);

  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Button to sidebar */}
      <section>
        <button
          className="cursor-pointer border rounded-lg p-2 border-gray-300 text-gray-500"
          onClick={() => dispatch(toggleAside())}
        >
          {isAsideOpen ? <IconClose size={25} /> : <IconMenu size={25} />}
        </button>
      </section>
      {/* Notification and user info */}
      <section className="flex flex-row items-center gap-3">
        <div>
          <button className="cursor-pointer border rounded-4xl p-3 border-gray-300 text-gray-500">
            <IconNotification size={20} />
          </button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <button className="cursor-pointer border rounded-4xl p-3 border-gray-300 text-gray-500">
            {user?.image ? (
              <img
                src={user.image}
                alt="User profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <IconUser size={20} />
            )}
          </button>
          <button className="text-gray-500 text-md cursor-pointer flex flex-row items-center justify-center gap-1">
            {user?.name ? user.name : 'Nombre'}
            <IconArrowDown size={22} />
          </button>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
