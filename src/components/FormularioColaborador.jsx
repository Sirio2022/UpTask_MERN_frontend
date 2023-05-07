import { useState } from 'react';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

export default function FormularioColaborador() {
  const [email, setEmail] = useState('');

  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true,
      });
      return;
    }
    submitColaborador(email);
  };

  const { msg } = alerta;

  return (
    <form
      className="rounded-lg bg-white px-5 py-10 shadow md:w-1/2 w-full"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-sm font-bold uppercase text-gray-700"
          htmlFor="email "
        >
          Email colaborador
        </label>

        <input
          id="email"
          type="email"
          placeholder="Email del colaborador"
          className="mt-2 w-full rounded border border-gray-300 p-3 outline-none focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="w-full cursor-pointer rounded bg-sky-500 p-3 text-sm font-bold uppercase text-white hover:bg-sky-600"
        value="Buscar Colaborador"
      />
    </form>
  );
}
