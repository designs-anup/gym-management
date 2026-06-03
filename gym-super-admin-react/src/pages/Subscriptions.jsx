import {
  Crown,
  Star,
  Gem,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "₹999",
    duration: "/month",
    branches: "1 Branch",
    members: "500 Members",
    icon: Star,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Standard",
    price: "₹2499",
    duration: "/month",
    branches: "3 Branches",
    members: "1500 Members",
    icon: Crown,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Premium",
    price: "₹4999",
    duration: "/month",
    branches: "Unlimited",
    members: "Unlimited Members",
    icon: Gem,
    color: "bg-purple-100 text-purple-600",
  },
];

const subscriptions = [
  {
    gym: "Iron Fitness",
    owner: "Rahul Sharma",
    plan: "Premium",
    billing: "Yearly",
    expiry: "12 Dec 2026",
    status: "Active",
  },
  {
    gym: "Power Gym",
    owner: "Amit Singh",
    plan: "Standard",
    billing: "Monthly",
    expiry: "05 Jun 2026",
    status: "Trial",
  },
  {
    gym: "Elite Fitness",
    owner: "Priya Das",
    plan: "Basic",
    billing: "Quarterly",
    expiry: "20 May 2026",
    status: "Expired",
  },
];

export default function Subscriptions() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Subscription Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage plans and gym subscriptions
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md">
          <Plus size={20} />
          Create Plan
        </button>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-7 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.color}`}
                >
                  <Icon size={28} />
                </div>

                <div className="flex gap-2">
                  <button className="p-2 rounded-xl bg-green-100 text-green-600">
                    <Pencil size={18} />
                  </button>

                  <button className="p-2 rounded-xl bg-red-100 text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                {plan.name}
              </h2>

              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {plan.price}
                </span>

                <span className="text-slate-500">
                  {plan.duration}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle
                    size={18}
                    className="text-green-500"
                  />
                  {plan.branches}
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle
                    size={18}
                    className="text-green-500"
                  />
                  {plan.members}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Active Subscriptions
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">Gym</th>
                <th className="p-5">Owner</th>
                <th className="p-5">Plan</th>
                <th className="p-5">Billing</th>
                <th className="p-5">Expiry</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {item.gym}
                  </td>

                  <td className="p-5">
                    {item.owner}
                  </td>

                  <td className="p-5">
                    {item.plan}
                  </td>

                  <td className="p-5">
                    {item.billing}
                  </td>

                  <td className="p-5">
                    {item.expiry}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Trial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
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