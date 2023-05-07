import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', {
        email,
        password,
      });
      setAlerta({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/proyectos');
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
        Inicia sesión y administra tus{' '}
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

        <input
          className="mb-5 w-full cursor-pointer rounded-xl bg-sky-600 py-3 text-xl font-bold uppercase text-white transition-colors duration-300 hover:bg-sky-700"
          type="submit"
          value="Iniciar Sesión"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="my-5 block text-center uppercase text-slate-500"
          to="/registrar"
        >
          ¿No tienes cuenta? <span className="text-sky-600">Regístrate</span>
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
