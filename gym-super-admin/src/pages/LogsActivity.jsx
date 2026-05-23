import {
  Activity,
  Shield,
  User,
  Database,
  Download,
  Filter,
  Search,
} from "lucide-react";

const stats = [
  {
    title: "System Logs",
    value: "18,245",
    icon: Database,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "User Activities",
    value: "9,842",
    icon: User,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Security Events",
    value: "324",
    icon: Shield,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Live Activities",
    value: "48",
    icon: Activity,
    color: "bg-purple-100 text-purple-600",
  },
];

const logs = [
  {
    user: "Rahul Sharma",
    action: "Created New Gym",
    module: "Gym Management",
    ip: "192.168.1.12",
    time: "12 May 2026, 10:42 AM",
    status: "Success",
  },
  {
    user: "Amit Singh",
    action: "Payment Failed",
    module: "Billing",
    ip: "192.168.1.52",
    time: "12 May 2026, 09:18 AM",
    status: "Warning",
  },
  {
    user: "Priya Das",
    action: "Unauthorized Login Attempt",
    module: "Security",
    ip: "192.168.1.88",
    time: "11 May 2026, 08:22 PM",
    status: "Blocked",
  },
];

export default function LogsActivity() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Logs & Activity
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor platform activity and audit logs
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md">
          <Download size={18} />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
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

      {/* Search & Filter */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative w-full lg:w-[350px]">
            <Search
              size={18}
              className="absolute top-4 left-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search logs..."
              className="w-full border border-slate-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          <button className="border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-100">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Activity Logs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">User</th>
                <th className="p-5">Action</th>
                <th className="p-5">Module</th>
                <th className="p-5">IP Address</th>
                <th className="p-5">Time</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {log.user}
                  </td>

                  <td className="p-5">
                    {log.action}
                  </td>

                  <td className="p-5">
                    {log.module}
                  </td>

                  <td className="p-5">
                    {log.ip}
                  </td>

                  <td className="p-5">
                    {log.time}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        log.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : log.status === "Warning"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
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