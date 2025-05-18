import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks';
import { toggleAside } from '../../store/slices/uiSlice';

import { IconClose, IconMenu } from '../../assets/icons';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const isAsideOpen = useAppSelector((state) => state.ui.isAsideOpen);

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
    </header>
  );
};

export default Navbar;
