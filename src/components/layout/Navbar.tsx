import { IoMenu } from "react-icons/io5";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Panel de Control</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
        >
          <IoMenu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
