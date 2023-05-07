import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

export default function FormularioProyecto() {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  const params = useParams();
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario

    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });

      return;
    }

    // Pasar los datos hacia el provider
    await submitProyecto({
      nombre,
      descripcion,
      fechaEntrega,
      cliente,
      id
    });

    // Reiniciar el form
    setId(null)
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setCliente('');
  };

  const { msg } = alerta;

  return (
    <form
      className="rounded-lg bg-white px-5 py-10 shadow md:w-1/2"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-sm font-bold uppercase text-gray-700"
        >
          Nombre del Proyecto
        </label>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre del Proyecto"
          className="mt-2 w-full rounded-md border p-2 placeholder-gray-400"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label
          htmlFor="descripcion"
          className="text-sm font-bold uppercase text-gray-700"
        >
          Descripción del Proyecto
        </label>
        <textarea
          id="descripcion"
          placeholder="Descripcion del Proyecto"
          className="mt-2 w-full rounded-md border p-2 placeholder-gray-400"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <label
          htmlFor="fecha-entrega"
          className="text-sm font-bold uppercase text-gray-700"
        >
          Fecha de Entrega
        </label>
        <input
          type="date"
          id="fecha-entrega"
          className="mt-2 w-full rounded-md border p-2 placeholder-gray-400"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
        <label
          htmlFor="cliente"
          className="text-sm font-bold uppercase text-gray-700"
        >
          Nombre del Cliente
        </label>
        <input
          type="text"
          id="cliente"
          placeholder="Nombre del Cliente"
          className="mt-2 w-full rounded-md border p-2 placeholder-gray-400"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={id ? 'Editar Proyecto' : 'Crear Proyecto'}
        className="w-full cursor-pointer rounded bg-sky-600 p-3 uppercase text-white transition-colors hover:bg-sky-700"
      />
    </form>
  );
}
