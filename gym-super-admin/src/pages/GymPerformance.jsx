import {
  Users,
  Wallet,
  CalendarCheck,
  UserCog,
  RefreshCcw,
  CreditCard,
  Dumbbell,
  Filter,
} from "lucide-react";

const performanceStats = [
  {
    title: "Member Count",
    value: "18,420",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Revenue",
    value: "₹8.5M",
    icon: Wallet,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Attendance Rate",
    value: "87%",
    icon: CalendarCheck,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Trainer Performance",
    value: "92%",
    icon: UserCog,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Membership Renewals",
    value: "1,240",
    icon: RefreshCcw,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Pending Payments",
    value: "54",
    icon: CreditCard,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Class Engagement",
    value: "79%",
    icon: Dumbbell,
    color: "bg-pink-100 text-pink-600",
  },
];

const gyms = [
  {
    gym: "Iron Fitness",
    members: 850,
    revenue: "₹1,20,000",
    attendance: "92%",
    renewals: 220,
    status: "Active",
  },
  {
    gym: "Power Gym",
    members: 620,
    revenue: "₹95,000",
    attendance: "81%",
    renewals: 145,
    status: "Trial",
  },
  {
    gym: "Elite Fitness",
    members: 410,
    revenue: "₹52,000",
    attendance: "64%",
    renewals: 88,
    status: "Suspended",
  },
];

export default function GymPerformance() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Gym Performance
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor gym performance across platform
          </p>
        </div>

        <button className="border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-100">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {performanceStats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition"
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
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Revenue Performance
          </h2>

          <div className="h-[300px] bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
            Revenue Chart
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Attendance Analytics
          </h2>

          <div className="h-[300px] bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
            Attendance Chart
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Gym Performance Overview
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">
                  Gym Name
                </th>
                <th className="p-5">
                  Members
                </th>
                <th className="p-5">
                  Revenue
                </th>
                <th className="p-5">
                  Attendance
                </th>
                <th className="p-5">
                  Renewals
                </th>
                <th className="p-5">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {gyms.map((gym, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {gym.gym}
                  </td>

                  <td className="p-5">
                    {gym.members}
                  </td>

                  <td className="p-5 font-semibold text-green-600">
                    {gym.revenue}
                  </td>

                  <td className="p-5">
                    {gym.attendance}
                  </td>

                  <td className="p-5">
                    {gym.renewals}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        gym.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : gym.status === "Trial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {gym.status}
                    </span>
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