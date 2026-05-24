import {
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  Building2,
  CheckCircle,
  Ban,
  Clock,
} from "lucide-react";

const gymStats = [
  {
    title: "Total Gyms",
    value: "120",
    icon: Building2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active",
    value: "92",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Suspended",
    value: "18",
    icon: Ban,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Pending",
    value: "10",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const gyms = [
  {
    name: "Iron Fitness",
    owner: "Rahul Sharma",
    email: "iron@gym.com",
    city: "Bhubaneswar",
    plan: "Premium",
    members: 850,
    status: "Active",
  },
  {
    name: "Power Gym",
    owner: "Amit Singh",
    email: "power@gym.com",
    city: "Delhi",
    plan: "Standard",
    members: 420,
    status: "Pending",
  },
  {
    name: "Elite Fitness",
    owner: "Priya Das",
    email: "elite@gym.com",
    city: "Mumbai",
    plan: "Basic",
    members: 230,
    status: "Suspended",
  },
];

export default function GymsManagement() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Gyms Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all registered gyms
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md">
          <Plus size={20} />
          Add New Gym
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {gymStats.map((item, index) => {
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
              placeholder="Search gyms..."
              className="w-full border border-slate-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          <button className="border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-100">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">Gym</th>
                <th className="p-5">Owner</th>
                <th className="p-5">Email</th>
                <th className="p-5">City</th>
                <th className="p-5">Plan</th>
                <th className="p-5">Members</th>
                <th className="p-5">Status</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {gyms.map((gym, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-5 font-semibold text-slate-800">
                    {gym.name}
                  </td>

                  <td className="p-5">
                    {gym.owner}
                  </td>

                  <td className="p-5">
                    {gym.email}
                  </td>

                  <td className="p-5">
                    {gym.city}
                  </td>

                  <td className="p-5">
                    {gym.plan}
                  </td>

                  <td className="p-5">
                    {gym.members}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        gym.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : gym.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {gym.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <button className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200">
                        <Eye size={18} />
                      </button>

                      <button className="p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200">
                        <Pencil size={18} />
                      </button>

                      <button className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200">
                        <Trash2 size={18} />
                      </button>
                    </div>
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