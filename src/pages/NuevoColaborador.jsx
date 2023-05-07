import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormularioColaborador from '../components/FormularioColaborador';
import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta';

export default function NuevoColaborador() {
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
    alerta,
  } = useProyectos();
  const params = useParams();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (!proyecto?._id) return <Alerta alerta={alerta} />;

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador(a) al Proyexto: {proyecto.nombre}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        colaborador?.nombre && (
          <div className="mt-10 flex justify-center">
            <div className="w-full rounded-lg bg-white px-5 py-10 shadow md:w-1/2">
              <h2 className="mb-10 text-2xl font-black">Colaborador(a)</h2>

              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">{colaborador.nombre}</p>
                <button
                  onClick={() =>
                    agregarColaborador({ email: colaborador.email })
                  }
                  type="button"
                  className="rounded bg-sky-500 px-4 py-2 font-bold uppercase text-white hover:bg-sky-600"
                >
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
