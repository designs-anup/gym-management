import { NavLink } from "react-router-dom";

import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Wallet,
  BarChart3,
  Activity,
  Users,
  BellRing,
  Settings,
  ShieldCheck,
  LifeBuoy,
  ClipboardList,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Gyms Management",
    path: "/gyms",
    icon: <Building2 size={20} />,
  },
  {
    title: "Subscriptions",
    path: "/subscriptions",
    icon: <CreditCard size={20} />,
  },
  {
    title: "Revenue & Billing",
    path: "/revenue",
    icon: <Wallet size={20} />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <BarChart3 size={20} />,
  },
  {
    title: "Gym Performance",
    path: "/performance",
    icon: <Activity size={20} />,
  },
  {
    title: "Users & Roles",
    path: "/users",
    icon: <Users size={20} />,
  },
  {
    title: "Announcements",
    path: "/announcements",
    icon: <BellRing size={20} />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings size={20} />,
  },
  {
    title: "Security & Backup",
    path: "/security",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "Support Center",
    path: "/support",
    icon: <LifeBuoy size={20} />,
  },
  {
    title: "Logs & Activity",
    path: "/logs",
    icon: <ClipboardList size={20} />,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] =
    useState(false);
  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  return (
    <>
      {/* Mobile Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-xl shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-screen z-50
        bg-gradient-to-b
        from-slate-950
        via-blue-950
        to-slate-900
        text-white
        transition-all duration-300
        shadow-2xl
        ${
          collapsed
            ? "w-24"
            : "w-72"
        }
        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0
      `}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-6 border-b border-white/10">
          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold">
                Gym SaaS
              </h1>
              <p className="text-xs text-slate-400">
                Super Admin Panel
              </p>
            </div>
          )}

          <button
            className="hidden lg:flex p-2 rounded-lg hover:bg-white/10"
            onClick={() =>
              setCollapsed(!collapsed)
            }
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

          <button
            className="lg:hidden"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive =
                activeMenu === item.title;

              return (
                <li key={index}>
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                        `w-full flex items-center gap-4
                        px-4 py-3 rounded-2xl
                        transition-all duration-300
                        ${
                            isActive
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                            : "hover:bg-white/10"
                        }`
                        }
                    >
                        {item.icon}

                        {!collapsed && (
                        <span className="text-sm font-medium">
                            {item.title}
                        </span>
                        )}
                    </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile */}
        <div className="absolute bottom-5 left-4 right-4">
          <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="w-12 h-12 rounded-full"
            />

            {!collapsed && (
              <div>
                <h4 className="font-semibold text-sm">
                  Super Admin
                </h4>
                <p className="text-xs text-slate-400">
                  admin@gym.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main
        className={`
          transition-all duration-300
          min-h-screen p-8
          ${
            collapsed
              ? "lg:ml-24"
              : "lg:ml-72"
          }
        `}
      >
        <div className="bg-white p-8 rounded-3xl shadow-md">
          <h1 className="text-3xl font-bold text-slate-800">
            {activeMenu}
          </h1>

          <p className="text-slate-500 mt-2">
            Super Admin Dashboard
          </p>
        </div>
      </main>
    </>
  );
}