import useProyectos from '../hooks/useProyectos';

export default function Colaborador({ colaborador }) {
  const { handleModalEliminarColaborador } = useProyectos();
  const { nombre, email } = colaborador;
  return (
    <div className="flex items-center justify-between border-b p-5">
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>

      <div>
        <button
          onClick={() => handleModalEliminarColaborador(colaborador)}
          type="button"
          className="flex rounded-lg   bg-red-600 px-5 py-3 text-sm  font-bold uppercase text-white hover:bg-red-800"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
