import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import Alerta from './Alerta';
import useProyectos from '../hooks/useProyectos';

const PRIORIDAD = ['Baja', 'Media', 'Alta'];

const ModalFormularioTarea = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [prioridad, setPrioridad] = useState('');

  const params = useParams();

  const {
    modalFormularioTarea,
    handleModalTarea,
    mostrarAlerta,
    alerta,
    submitTarea,
    tarea,
  } = useProyectos();

  useEffect(() => {
    if (tarea?._id) {
      setId(tarea._id);
      setNombre(tarea.nombre);
      setDescripcion(tarea.descripcion);
      setFechaEntrega(tarea.fechaEntrega?.split('T')[0]);
      setPrioridad(tarea.prioridad);
      return;
    }
    setId('');
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setPrioridad('');
  }, [tarea]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    await submitTarea({
      id,
      nombre,
      descripcion,
      fechaEntrega,
      prioridad,
      proyecto: params.id,
    });
    setId('');
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setPrioridad('');
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalTarea}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleModalTarea}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    {id ? 'Editar Tarea' : 'Crear Tarea'}
                  </Dialog.Title>

                  {msg && <Alerta alerta={alerta} />}

                  <form onSubmit={handleSubmit} className="my-10">
                    <div className="mb-5">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="nombre"
                      >
                        Nombre de la tarea
                      </label>

                      <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la tarea"
                        className="mt-2 w-full rounded border border-gray-300 p-3 outline-none focus:border-indigo-500"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="descripcion"
                      >
                        Descripción de la tarea
                      </label>

                      <textarea
                        id="  descripcion"
                        placeholder="Descripción de la tarea"
                        className="mt-2 w-full rounded border border-gray-300 p-3 outline-none focus:border-indigo-500"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="fecha-entrega"
                      >
                        Fecha de entrega
                      </label>

                      <input
                        id="fecha-entrega"
                        type="date"
                        className="mt-2 w-full rounded border border-gray-300 p-3 outline-none focus:border-indigo-500"
                        value={fechaEntrega}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="prioridad"
                      >
                        Prioridad
                      </label>

                      <select
                        id="  prioridad"
                        className="mt-2 w-full rounded border border-gray-300 p-3 outline-none focus:border-indigo-500"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <option value="0">Seleccione una prioridad</option>
                        {PRIORIDAD.map((prioridad) => (
                          <option key={prioridad}>{prioridad}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      className="w-full cursor-pointer rounded bg-sky-500 p-3 text-sm font-bold uppercase text-white hover:bg-sky-600"
                      value={id ? 'Guardar Cambios' : 'Crear Tarea'}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioTarea;
