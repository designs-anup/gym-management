import {
  Mail,
  Bell,
  MessageSquare,
  Send,
  Smartphone,
} from "lucide-react";

const announcements = [
  {
    title: "Subscription Expiry Reminder",
    channel: "Email",
    sentTo: "120 Gyms",
    date: "12 May 2026",
    status: "Sent",
  },
  {
    title: "Platform Maintenance Alert",
    channel: "Push Notification",
    sentTo: "95 Gyms",
    date: "10 May 2026",
    status: "Scheduled",
  },
  {
    title: "Premium Plan Offer",
    channel: "SMS",
    sentTo: "80 Gyms",
    date: "08 May 2026",
    status: "Sent",
  },
];

const channels = [
  {
    title: "Email",
    icon: Mail,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "SMS",
    icon: MessageSquare,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Push Notification",
    icon: Smartphone,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "In-App Alert",
    icon: Bell,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function Announcements() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Announcements
        </h1>

        <p className="text-slate-500 mt-2">
          Send notifications to gym owners
        </p>
      </div>

      {/* Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {channels.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <h2 className="text-xl font-bold text-slate-800 mt-5">
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Send Announcement Form */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Send Announcement
        </h2>

        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <label className="block text-slate-600 mb-2">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter announcement title"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-2">
              Channel
            </label>

            <select className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500">
              <option>Email</option>
              <option>SMS</option>
              <option>Push Notification</option>
              <option>In-App Notification</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-slate-600 mb-2">
            Message
          </label>

          <textarea
            rows="5"
            placeholder="Write announcement..."
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2">
          <Send size={18} />
          Send Announcement
        </button>
      </div>

      {/* Announcement History */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Announcement History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">Title</th>
                <th className="p-5">Channel</th>
                <th className="p-5">Sent To</th>
                <th className="p-5">Date</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {announcements.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {item.title}
                  </td>

                  <td className="p-5">
                    {item.channel}
                  </td>

                  <td className="p-5">
                    {item.sentTo}
                  </td>

                  <td className="p-5">
                    {item.date}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        item.status === "Sent"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
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