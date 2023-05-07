import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

export default function ConfirmarCuenta() {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${token}`;
        const { data } = await clienteAxios.get(url);

        setAlerta({
          msg: data.msg,
          error: false,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    return () => {
      confirmarCuenta();
    };
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Confirma tu cuenta y comieza a crear tus{' '}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      <div className="mt-20 rounded-xl bg-white px-5 py-10 shadow-lg md:mt-5">
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            className="my-5 block text-center uppercase text-slate-500"
            to="/"
          >
            <span className="text-sky-600">Inicia sesión</span>
          </Link>
        )}
      </div>
    </>
  );
}
