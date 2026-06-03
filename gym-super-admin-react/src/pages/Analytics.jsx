import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Wallet,
  Activity,
} from "lucide-react";

const analyticsStats = [
  {
    title: "Total Gyms",
    value: "120",
    icon: Building2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Members",
    value: "12,540",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹1.2L",
    icon: Wallet,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Growth Rate",
    value: "+18%",
    icon: TrendingUp,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const topGyms = [
  {
    gym: "Iron Fitness",
    city: "Bhubaneswar",
    revenue: "₹1.2L",
    members: 850,
    growth: "+22%",
  },
  {
    gym: "Power Gym",
    city: "Delhi",
    revenue: "₹95K",
    members: 620,
    growth: "+15%",
  },
  {
    gym: "Elite Fitness",
    city: "Mumbai",
    revenue: "₹70K",
    members: 410,
    growth: "+9%",
  },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="text-slate-500 mt-2">
          Platform-wide analytics & insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {analyticsStats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-slate-800">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Growth */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <BarChart3 className="text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Revenue Growth
            </h2>
          </div>

          <div className="h-[300px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
            Revenue Chart
          </div>
        </div>

        {/* Attendance Analytics */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <Activity className="text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Attendance Analytics
            </h2>
          </div>

          <div className="h-[300px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
            Attendance Chart
          </div>
        </div>
      </div>

      {/* Top Performing Gyms */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Top Performing Gyms
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">Gym Name</th>
                <th className="p-5">City</th>
                <th className="p-5">Revenue</th>
                <th className="p-5">Members</th>
                <th className="p-5">Growth</th>
              </tr>
            </thead>

            <tbody>
              {topGyms.map((gym, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {gym.gym}
                  </td>

                  <td className="p-5">
                    {gym.city}
                  </td>

                  <td className="p-5 font-semibold text-green-600">
                    {gym.revenue}
                  </td>

                  <td className="p-5">
                    {gym.members}
                  </td>

                  <td className="p-5 text-blue-600 font-semibold">
                    {gym.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}