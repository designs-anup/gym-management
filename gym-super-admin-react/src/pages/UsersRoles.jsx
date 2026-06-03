import {
  ShieldCheck,
  Users,
  UserCog,
  Dumbbell,
  User,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const roles = [
  {
    role: "Super Admin",
    access: "Full Platform Access",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-600",
  },
  {
    role: "Gym Owner",
    access: "Full Gym Access",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    role: "Manager",
    access: "Gym Operations",
    icon: UserCog,
    color: "bg-purple-100 text-purple-600",
  },
  {
    role: "Trainer",
    access: "Workout + Members",
    icon: Dumbbell,
    color: "bg-green-100 text-green-600",
  },
  {
    role: "Receptionist",
    access: "Billing + Attendance",
    icon: User,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const users = [
  {
    name: "Rahul Sharma",
    email: "rahul@gym.com",
    role: "Gym Owner",
    gym: "Iron Fitness",
    status: "Active",
  },
  {
    name: "Amit Singh",
    email: "amit@gym.com",
    role: "Trainer",
    gym: "Power Gym",
    status: "Active",
  },
  {
    name: "Priya Das",
    email: "priya@gym.com",
    role: "Receptionist",
    gym: "Elite Fitness",
    status: "Inactive",
  },
];

export default function UsersRoles() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Users & Roles
          </h1>

          <p className="text-slate-500 mt-2">
            Manage platform users and permissions
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md">
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {roles.map((item, index) => {
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
                {item.role}
              </h2>

              <p className="text-slate-500 mt-2 text-sm">
                {item.access}
              </p>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">
            User Management
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">User</th>
                <th className="p-5">Email</th>
                <th className="p-5">Role</th>
                <th className="p-5">Gym</th>
                <th className="p-5">Status</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {user.name}
                  </td>

                  <td className="p-5">
                    {user.email}
                  </td>

                  <td className="p-5">
                    {user.role}
                  </td>

                  <td className="p-5">
                    {user.gym}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
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