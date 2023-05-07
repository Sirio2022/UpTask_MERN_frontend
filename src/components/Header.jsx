import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import Busqueda from './Busqueda';

export default function Header() {

const { handleBuscador,  cerrarSesionProyectos} = useProyectos();
const { cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProyectos();
    localStorage.removeItem('token');
  };

  return (
    <header className="border-b bg-white px-4 py-5">
      <div className="  md:flex md:justify-between">
        <h2 className="mb-5 text-center text-4xl font-black text-sky-600 md:mb-0">
          UpTask - MERN
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button type="button" className="font-bold uppercase" onClick={handleBuscador}>
            Buscar Proyecto
          </button>

          <Link to="/proyectos" className="font-bold uppercase ">
            Proyectos
          </Link>

          <button
            type="button"
            className="rounded-md bg-sky-600 p-3 text-sm font-bold uppercase text-white"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>

          <Busqueda />
        </div>
      </div>
    </header>
  );
}
