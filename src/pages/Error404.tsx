import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-gray-400">Página no encontrada</p>
      <Link to="/" className="p-2 rounded-md bg-blue-500 text-white mt-5">
        Volver a la página de inicio
      </Link>
    </div>
  );
};
