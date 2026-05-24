import { Menu } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({
  setSidebarOpen,
}) {
  const [darkMode, setDarkMode] =
    useState(false);

  const {
    logout,
    profile,
  } = useAuth();

  useEffect(() => {
    const theme =
      localStorage.getItem(
        "theme"
      );

    if (theme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );

      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const html =
      document.documentElement;

    if (darkMode) {
      html.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    } else {
      html.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    }

    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden"
          onClick={() =>
            setSidebarOpen(true)
          }
        >
          <Menu />
        </button>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Gym SaaS Admin
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* Profile */}
        <div className="relative group">
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-2xl px-3 py-2 hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {profile?.full_name?.[0] ||
                "A"}
            </div>

            <div>
              <h4 className="font-semibold text-sm text-slate-800 dark:text-white">
                {profile?.full_name ||
                  "Admin"}
              </h4>

              <p className="text-xs text-slate-500 capitalize">
                {profile?.role?.replace(
                  "_",
                  " "
                ) ||
                  "Super Admin"}
              </p>
            </div>
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 top-14 bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-2 hidden group-hover:block min-w-[180px] border dark:border-slate-700">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}