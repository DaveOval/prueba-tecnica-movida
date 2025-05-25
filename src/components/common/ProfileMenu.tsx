import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/slices/authSlice';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileMenu = ({ isOpen, onClose }: ProfileMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-14 bg-white shadow-lg rounded-2xl p-4 w-64 z-50 border border-gray-200"
    >
      <div className="mb-2">
        <div className="font-semibold">{user?.name}</div>
        <div className="text-sm text-gray-500">{user?.email}</div>
      </div>
      <ul>
        <li>
          <button className="w-full text-left py-2 hover:bg-gray-100 rounded">
            Editar perfil
          </button>
        </li>
        <li>
          <button className="w-full text-left py-2 hover:bg-gray-100 rounded">
            Configuración de cuenta
          </button>
        </li>
        <li>
          <button className="w-full text-left py-2 hover:bg-gray-100 rounded">
            Soporte
          </button>
        </li>
        <li className="border-t border-gray-200">
          <button
            className="w-full text-left py-2 text-red-500 hover:bg-gray-100 rounded"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};
