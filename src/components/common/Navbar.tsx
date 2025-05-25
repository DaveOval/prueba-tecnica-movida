import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useIsMobile } from '../../hooks';
import { toggleAside } from '../../store/slices/uiSlice';
import { ProfileMenu } from './';
import {
  IconArrowDown,
  IconClose,
  IconMenu,
  IconUser,
  IconMenuVertical,
  // IconNotification,
} from '../../assets/icons';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isAsideOpen = useAppSelector((state) => state.ui.isAsideOpen);
  const isMobile = useIsMobile();
  const user = useAppSelector((state) => state.auth.user);

  const handleUserMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 px-6">
        {/* Button to sidebar */}
        <div
          className={`flex flex-row items-center justify-between w-full h-full ${
            isMobile ? 'justify-between' : ''
          }`}
        >
          <section>
            <button
              className="cursor-pointer border rounded-lg p-2 border-gray-300 text-gray-500"
              onClick={() => dispatch(toggleAside())}
            >
              {isAsideOpen ? <IconClose size={25} /> : <IconMenu size={25} />}
            </button>
          </section>
          {/* Icon app only for mobile */}
          {isMobile && (
            <>
              <section>
                <Link to="/dashboard">
                  <picture>
                    <img src="./logo.svg" className="w-13 h-13" />
                  </picture>
                </Link>
              </section>

              <section>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer"
                >
                  <IconMenuVertical size={25} />
                </button>
              </section>
            </>
          )}
          {/* Notification and user info */}
          {!isMobile && (
            <section className="flex flex-row items-center gap-3 relative">
              {/* <div>
                <button className="cursor-pointer border rounded-4xl p-3 border-gray-300 text-gray-500">
                  <IconNotification size={20} />
                </button>
              </div> */}
              <div className="flex flex-row items-center gap-2">
                <button
                  className="cursor-pointer border rounded-4xl p-3 border-gray-300 text-gray-500"
                  onClick={handleUserMenuToggle}
                >
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
                <button
                  className="text-gray-500 text-md cursor-pointer flex flex-row items-center justify-center gap-1"
                  onClick={handleUserMenuToggle}
                >
                  {user?.name ? user.name : 'Nombre'}
                  <IconArrowDown size={22} />
                </button>
              </div>
              <ProfileMenu
                isOpen={isUserMenuOpen}
                onClose={() => setIsUserMenuOpen(false)}
              />
            </section>
          )}
        </div>
      </header>
      {isOpen && isMobile && (
        <div className="h-16 bg-white border-b border-gray-200 px-6 shadow-md flex flex-row items-center justify-end relative">
          {/* Notification and user info */}
          <section className="flex flex-row items-center gap-3">
            {/* <div>
                <button className="cursor-pointer border rounded-4xl p-3 border-gray-300 text-gray-500">
                  <IconNotification size={20} />
                </button>
              </div> */}
            <div className="flex flex-row items-center gap-2">
              <button
                className="cursor-pointer border rounded-4xl p-3 border-gray-300 text-gray-500"
                onClick={handleUserMenuToggle}
              >
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
              <button
                className="text-gray-500 text-md cursor-pointer flex flex-row items-center justify-center gap-1"
                onClick={handleUserMenuToggle}
              >
                {user?.name ? user.name : 'Nombre'}
                <IconArrowDown size={22} />
              </button>
            </div>
            <ProfileMenu
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
            />
          </section>
        </div>
      )}
    </>
  );
};

export default Navbar;
