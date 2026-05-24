import {
  Building2,
  Wallet,
  Users,
  Dumbbell,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Total Gyms",
    value: "120",
    icon: Building2,
  },
  {
    title: "Revenue",
    value: "₹8.5L",
    icon: Wallet,
  },
  {
    title: "Total Members",
    value: "12,540",
    icon: Users,
  },
  {
    title: "Total Trainers",
    value: "480",
    icon: Dumbbell,
  },
  {
    title: "Growth Rate",
    value: "+18%",
    icon: TrendingUp,
  },
  {
    title: "Pending Payments",
    value: "42",
    icon: AlertTriangle,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Welcome Back, Super Admin 👋
        </h1>

        <p className="mt-3 text-blue-100">
          Manage gyms, subscriptions, revenue and analytics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
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

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Icon
                    size={28}
                    className="text-blue-600"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Gym Activity */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Recent Gym Activity
          </h2>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-slate-500 text-left">
                <th className="pb-4">
                  Gym Name
                </th>
                <th className="pb-4">
                  Owner
                </th>
                <th className="pb-4">
                  Plan
                </th>
                <th className="pb-4">
                  Revenue
                </th>
                <th className="pb-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-5 font-medium">
                  Iron Fitness
                </td>
                <td>Rahul Sharma</td>
                <td>Premium</td>
                <td>₹45,000</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                    Active
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-5 font-medium">
                  Power Gym
                </td>
                <td>Amit Singh</td>
                <td>Standard</td>
                <td>₹25,000</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
                    Trial
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-5 font-medium">
                  Elite Fitness
                </td>
                <td>Priya Das</td>
                <td>Basic</td>
                <td>₹18,000</td>
                <td>
                  <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm">
                    Suspended
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}