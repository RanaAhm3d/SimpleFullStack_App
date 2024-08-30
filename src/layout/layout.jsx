import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
export default function layout() {
  return (
    <>
      <Navbar />
      <main className='p-4 mx-auto max-w-screen-xl'>
        <Outlet />
      </main>
    </>
  );
}
