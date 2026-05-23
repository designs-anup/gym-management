import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-6 bg-slate-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}