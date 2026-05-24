import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Wallet,
  BarChart3,
  Dumbbell,
  Users,
  Bell,
  Settings,
  Shield,
  LifeBuoy,
  Activity,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Gyms Management",
    path: "/gyms-management",
    icon: Building2,
  },
  {
    name: "Subscriptions",
    path: "/subscriptions",
    icon: CreditCard,
  },
  {
    name: "Revenue & Billing",
    path: "/revenue-billing",
    icon: Wallet,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Gym Performance",
    path: "/gym-performance",
    icon: Dumbbell,
  },
  {
    name: "Users & Roles",
    path: "/users-roles",
    icon: Users,
  },
  {
    name: "Announcements",
    path: "/announcements",
    icon: Bell,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    name: "Security",
    path: "/security-backup",
    icon: Shield,
  },
  {
    name: "Support",
    path: "/support-center",
    icon: LifeBuoy,
  },
  {
    name: "Logs",
    path: "/logs-activity",
    icon: Activity,
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const isDesktop =
    typeof window !== "undefined" &&
    window.innerWidth >= 1024;

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          x: isDesktop
            ? 0
            : sidebarOpen
            ? 0
            : -300,
        }}
        transition={{ duration: 0.25 }}
        className={`
          fixed top-0 left-0 z-50
          w-[280px] h-screen
          bg-white dark:bg-slate-900
          border-r border-slate-200
          dark:border-slate-800
          p-5

          lg:translate-x-0
          lg:block
        `}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white">
            Gym SaaS
          </h1>

          <button
            className="lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <X />
          </button>
        </div>

        <nav className="space-y-2">
          {menus.map((menu, index) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={index}
                to={menu.path}
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300"
                  }`
                }
              >
                <Icon size={20} />
                {menu.name}
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}