import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

export default function Registrar() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, confirmarPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    if (password !== confirmarPassword) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: 'La contraseña debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }
    setAlerta({});

    // Crear el usuario en la API.  Cuando se pasan todas las validaciones.

    try {
      const usuario = {
        nombre,
        email,
        password,
      };
      const { data } = await clienteAxios.post(`/usuarios`, usuario);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmarPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Crea tu cuenta y administra tus{' '}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 rounded-lg bg-white p-10 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            className="mt-3  w-full rounded-xl border bg-gray-50 p-3"
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-3  w-full rounded-xl border bg-gray-50 p-3"
            type="email"
            name="email"
            placeholder="Tu email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-3  w-full rounded-xl border bg-gray-50 p-3"
            type="password"
            name="password"
            placeholder="Tu password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="confirmar-password"
          >
            Confirmar Password
          </label>
          <input
            className="mt-3  w-full rounded-xl border bg-gray-50 p-3"
            type="password"
            name="confirmar-password"
            placeholder="Repite tu password"
            id="confirmar-password"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
          />
        </div>

        <input
          className="mb-5 w-full cursor-pointer rounded-xl bg-sky-600 py-3 text-xl font-bold uppercase text-white transition-colors duration-300 hover:bg-sky-700"
          type="submit"
          value="Crear Cuenta"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="my-5 block text-center uppercase text-slate-500"
          to="/"
        >
          ¿Ya posees una cuenta?{' '}
          <span className="text-sky-600">Inicia sesión</span>
        </Link>
        <Link
          className="my-5 block text-center uppercase text-slate-500"
          to="/olvide-password"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
}
