import {
  Bell,
  Menu,
  Moon,
  Sun,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar({
  setSidebarOpen,
}) {
  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const theme =
      localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle(
      "dark"
    );

    const isDark =
      document.documentElement.classList.contains(
        "dark"
      );

    setDarkMode(isDark);

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
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

          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-[300px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 pl-10 pr-4 outline-none"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <button className="relative w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Bell size={20} />

            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-2xl px-3 py-2">
            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="w-10 h-10 rounded-full"
            />

            <div className="hidden md:block">
              <h4 className="font-semibold dark:text-white">
                Super Admin
              </h4>

              <p className="text-sm text-slate-500">
                admin@gym.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}