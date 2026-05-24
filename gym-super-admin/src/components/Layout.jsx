import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:ml-[280px]">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="p-6 min-h-[calc(100vh-80px)] bg-slate-100 dark:bg-slate-950">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}