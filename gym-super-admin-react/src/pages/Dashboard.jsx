import {
  Building2,
  Users,
  Wallet,
  TrendingUp,
  Activity,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Gyms",
    value: "120",
    growth: "+12%",
    icon: Building2,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Total Members",
    value: "18,420",
    growth: "+18%",
    icon: Users,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Revenue",
    value: "₹8.5L",
    growth: "+22%",
    icon: Wallet,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Active Sessions",
    value: "248",
    growth: "+8%",
    icon: Activity,
    color: "from-orange-500 to-red-500",
  },
];

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 160000 },
  { month: "Mar", revenue: 220000 },
  { month: "Apr", revenue: 280000 },
  { month: "May", revenue: 340000 },
  { month: "Jun", revenue: 420000 },
];

const gymGrowthData = [
  { month: "Jan", gyms: 20 },
  { month: "Feb", gyms: 32 },
  { month: "Mar", gyms: 48 },
  { month: "Apr", gyms: 65 },
  { month: "May", gyms: 84 },
  { month: "Jun", gyms: 120 },
];

import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Page Heading */}
      {/*
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back, Super Admin 👋
        </p>
      </div>
      */}  
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 lg:p-10 text-white shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Welcome Back, Super Admin 👋
          </h1>

          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Monitor gyms, subscriptions, analytics,
            revenue and platform performance from
            one powerful dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all shadow-lg">
              Manage Gyms
            </button>

            <button className="border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all">
              View Analytics
            </button>
          </div>
        </div>

        {/* Decorative Blur */}
        <div className="absolute top-[-80px] right-[-80px] w-[280px] h-[280px] rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-[-100px] left-[200px] w-[250px] h-[250px] rounded-full bg-purple-400/20 blur-3xl" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
            <StatsCard
                key={index}
                title={item.title}
                value={item.value}
                growth={item.growth}
                icon={item.icon}
                color={item.color}
            />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[30px] p-6 border border-white/20 dark:border-slate-800 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-5">
            Revenue Overview
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                <defs>
                    <linearGradient
                    id="colorRevenue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                    >
                    <stop
                        offset="5%"
                        stopColor="#2563eb"
                        stopOpacity={0.4}
                    />
                    <stop
                        offset="95%"
                        stopColor="#2563eb"
                        stopOpacity={0}
                    />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                />
                </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[30px] p-6 border border-white/20 dark:border-slate-800 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-5">
            Gym Growth Analytics
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gymGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="gyms"
                    radius={[10, 10, 0, 0]}
                />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}