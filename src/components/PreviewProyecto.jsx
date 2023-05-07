import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PreviewProyecto({ proyecto }) {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador } = proyecto;
  return (
    <div className="flex flex-col md:flex-row border-b p-5 justify-between">
      <div className="flex items-center gap-2 ">
        <p className="flex-1">
          {nombre}
          <span className="text-sm uppercase text-gray-500"> - {cliente}</span>
        </p>

        {auth._id !== creador && (
          <p className="rounded-lg bg-green-500 p-1 text-xs font-bold uppercase text-white">
            Colaborador
          </p>
        )}
      </div>

      <Link
        to={`${_id}`}
        className="ml-auto font-bold text-blue-500 hover:text-blue-700 "
      >
        Ver Proyecto
      </Link>
    </div>
  );
}
