import {
  LifeBuoy,
  MessageCircle,
  HelpCircle,
  Ticket,
  Search,
  Plus,
  Clock,
} from "lucide-react";

const supportStats = [
  {
    title: "Open Tickets",
    value: "28",
    icon: Ticket,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Resolved",
    value: "142",
    icon: HelpCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Replies",
    value: "16",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Live Chats",
    value: "08",
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-600",
  },
];

const tickets = [
  {
    id: "#SUP-1024",
    gym: "Iron Fitness",
    issue: "Subscription payment failed",
    priority: "High",
    date: "12 May 2026",
    status: "Open",
  },
  {
    id: "#SUP-1025",
    gym: "Power Gym",
    issue: "Unable to add members",
    priority: "Medium",
    date: "11 May 2026",
    status: "Pending",
  },
  {
    id: "#SUP-1026",
    gym: "Elite Fitness",
    issue: "Trainer login issue",
    priority: "Low",
    date: "10 May 2026",
    status: "Resolved",
  },
];

const faqs = [
  "How to renew subscription?",
  "How to add gym branches?",
  "How to reset password?",
  "How to enable attendance tracking?",
];

export default function SupportCenter() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Support Center
          </h1>

          <p className="text-slate-500 mt-2">
            Manage support tickets and FAQs
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md">
          <Plus size={20} />
          Create Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {supportStats.map((item, index) => {
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

      {/* Search */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute top-4 left-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search support..."
            className="w-full border border-slate-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* FAQ + Chat */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* FAQ */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <HelpCircle className="text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 p-4 rounded-2xl hover:bg-slate-100 cursor-pointer transition"
              >
                {faq}
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <MessageCircle className="text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Live Chat Support
            </h2>
          </div>

          <div className="h-[300px] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
            Chat Window Placeholder
          </div>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Support Tickets
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">Ticket ID</th>
                <th className="p-5">Gym</th>
                <th className="p-5">Issue</th>
                <th className="p-5">Priority</th>
                <th className="p-5">Date</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {ticket.id}
                  </td>

                  <td className="p-5">
                    {ticket.gym}
                  </td>

                  <td className="p-5">
                    {ticket.issue}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : ticket.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="p-5">
                    {ticket.date}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        ticket.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ticket.status}
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