import {
  ShieldCheck,
  KeyRound,
  DatabaseBackup,
  MonitorSmartphone,
  History,
  AlertTriangle,
  Download,
  RefreshCcw,
} from "lucide-react";

const securityStats = [
  {
    title: "2FA Enabled",
    value: "98%",
    icon: ShieldCheck,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Active Sessions",
    value: "248",
    icon: MonitorSmartphone,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Failed Logins",
    value: "18",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Backups",
    value: "124",
    icon: DatabaseBackup,
    color: "bg-purple-100 text-purple-600",
  },
];

const loginHistory = [
  {
    user: "Rahul Sharma",
    role: "Gym Owner",
    device: "Chrome / Windows",
    location: "Delhi, India",
    time: "12 May 2026, 10:30 AM",
    status: "Success",
  },
  {
    user: "Amit Singh",
    role: "Trainer",
    device: "Android App",
    location: "Mumbai, India",
    time: "12 May 2026, 09:12 AM",
    status: "Failed",
  },
  {
    user: "Priya Das",
    role: "Receptionist",
    device: "Safari / Mac",
    location: "Bhubaneswar, India",
    time: "11 May 2026, 08:45 PM",
    status: "Success",
  },
];

export default function SecurityBackup() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-slate-800">
          Security & Backup
        </h1>

        <p className="text-slate-500 mt-2">
          Manage security, sessions and backups
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {securityStats.map((item, index) => {
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

      {/* Security Settings */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 2FA */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <KeyRound className="text-blue-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              Two Factor Authentication
            </h2>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-5 rounded-2xl">
            <div>
              <h3 className="font-semibold text-slate-800">
                Enable 2FA
              </h3>

              <p className="text-slate-500 text-sm">
                Improve account security
              </p>
            </div>

            <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
              Enabled
            </button>
          </div>
        </div>

        {/* Backup */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <DatabaseBackup className="text-purple-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              Database Backup
            </h2>
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
              <Download size={18} />
              Backup Now
            </button>

            <button className="border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-100">
              <RefreshCcw size={18} />
              Restore
            </button>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b flex items-center gap-3">
          <History className="text-slate-700" />

          <h2 className="text-2xl font-bold text-slate-800">
            Login History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">User</th>
                <th className="p-5">Role</th>
                <th className="p-5">Device</th>
                <th className="p-5">Location</th>
                <th className="p-5">Time</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {loginHistory.map((log, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {log.user}
                  </td>

                  <td className="p-5">
                    {log.role}
                  </td>

                  <td className="p-5">
                    {log.device}
                  </td>

                  <td className="p-5">
                    {log.location}
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