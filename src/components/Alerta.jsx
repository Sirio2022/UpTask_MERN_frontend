export default function Alerta({ alerta }) {
  return (
    <div
      className={`${
        alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'
      } mb-10 mt-10 rounded-lg bg-gradient-to-br p-4 text-center font-bold uppercase text-white`}
    >
      {alerta.msg}
    </div>
  );
}
