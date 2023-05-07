import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

export default function NuevoPassword() {
  const [tokenvalido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    return () => {
      comprobarToken();
    };
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'La contraseña debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
      setPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}

      {tokenvalido && (
        <form
          className="my-10 rounded-lg bg-white p-10 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="block text-xl font-bold uppercase text-gray-600"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              className="mt-3  w-full rounded-xl border bg-gray-50 p-3"
              type="password"
              name="password"
              placeholder="Ingresa tu nuevo password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            className="mb-5 w-full cursor-pointer rounded-xl bg-sky-600 py-3 text-xl font-bold uppercase text-white transition-colors duration-300 hover:bg-sky-700"
            type="submit"
            value="Reestablecer Password"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          className="my-5 block text-center uppercase text-slate-500"
          to="/"
        >
          <span className="text-sky-600">Inicia sesión</span>
        </Link>
      )}
    </>
  );
}
