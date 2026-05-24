import {
  Wallet,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Download,
  Filter,
} from "lucide-react";

const revenueStats = [
  {
    title: "Total Revenue",
    value: "₹8.5L",
    icon: Wallet,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹1.2L",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pending Payments",
    value: "₹42,500",
    icon: AlertCircle,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Failed Payments",
    value: "12",
    icon: CreditCard,
    color: "bg-red-100 text-red-600",
  },
];

const paymentLogs = [
  {
    gym: "Iron Fitness",
    plan: "Premium",
    amount: "₹4999",
    method: "UPI",
    date: "12 May 2026",
    status: "Paid",
  },
  {
    gym: "Power Gym",
    plan: "Standard",
    amount: "₹2499",
    method: "Card",
    date: "11 May 2026",
    status: "Pending",
  },
  {
    gym: "Elite Fitness",
    plan: "Basic",
    amount: "₹999",
    method: "Net Banking",
    date: "10 May 2026",
    status: "Failed",
  },
];

export default function RevenueBilling() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Revenue & Billing
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor subscriptions and revenue
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-100">
            <Filter size={18} />
            Filter
          </button>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {revenueStats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
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

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Revenue Growth
          </h2>

          <select className="border border-slate-200 rounded-xl px-4 py-2 outline-none">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>

        <div className="h-[300px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
          Revenue Chart Here
        </div>
      </div>

      {/* Payment Logs */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Payment Logs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">Gym</th>
                <th className="p-5">Plan</th>
                <th className="p-5">Amount</th>
                <th className="p-5">Method</th>
                <th className="p-5">Date</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {paymentLogs.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {payment.gym}
                  </td>

                  <td className="p-5">
                    {payment.plan}
                  </td>

                  <td className="p-5 font-semibold">
                    {payment.amount}
                  </td>

                  <td className="p-5">
                    {payment.method}
                  </td>

                  <td className="p-5">
                    {payment.date}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
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