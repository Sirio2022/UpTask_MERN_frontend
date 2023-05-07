import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <>
      <main className="container mx-auto mt-5 p-5 md:mt-20 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-3/5">
          <Outlet />
        </div>
      </main>
    </>
  );
}
