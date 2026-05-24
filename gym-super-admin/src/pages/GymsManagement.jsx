import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

export default function GymsManagement() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      gym_name: "",
      owner_name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      subscription_plan: "basic",
      branches: 1,
      status: "pending",
    });

  const [gyms, setGyms] = useState([]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase
        .from("gyms")
        .insert([formData]);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Gym Registered Successfully"
      );

      setFormData({
        gym_name: "",
        owner_name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        subscription_plan:
          "basic",
        branches: 1,
        status: "pending",
      });
    }

    setLoading(false);
  };

  const fetchGyms = async () => {
  const { data, error } =
      await supabase
        .from("gyms")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (!error) {
      setGyms(data);
    }
  };
  useEffect(() => {
    fetchGyms();
  }, []);

  const updateGymStatus = async (
    id,
    status
  ) => {
    const { error } =
      await supabase
        .from("gyms")
        .update({ status })
        .eq("id", id);

    if (!error) {
      toast.success(
        `Gym ${status}`
      );

      fetchGyms();
    }
  };
  
  const deleteGym = async (id) => {
  const confirmed =
      window.confirm(
        "Delete this gym?"
      );

    if (!confirmed) return;

    const { error } =
      await supabase
        .from("gyms")
        .delete()
        .eq("id", id);

    if (!error) {
      toast.success(
        "Gym deleted"
      );

      fetchGyms();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-[30px] p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-8">
          Register Gym
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="gym_name"
            placeholder="Gym Name"
            value={formData.gym_name}
            onChange={handleChange}
            className="p-4 rounded-2xl border"
            required
          />

          <input
            type="text"
            name="owner_name"
            placeholder="Owner Name"
            value={formData.owner_name}
            onChange={handleChange}
            className="p-4 rounded-2xl border"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-2xl border"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-4 rounded-2xl border"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-4 rounded-2xl border"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="p-4 rounded-2xl border"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="p-4 rounded-2xl border"
          />

          <select
            name="subscription_plan"
            value={
              formData.subscription_plan
            }
            onChange={handleChange}
            className="p-4 rounded-2xl border"
          >
            <option value="basic">
              Basic
            </option>
            <option value="standard">
              Standard
            </option>
            <option value="premium">
              Premium
            </option>
          </select>

          <button
            disabled={loading}
            className="col-span-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
          >
            {loading
              ? "Registering..."
              : "Register Gym"}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[30px] p-8 shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-6">
          Registered Gyms
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">
                  Gym
                </th>

                <th className="text-left py-4">
                  Owner
                </th>

                <th className="text-left py-4">
                  Email
                </th>

                <th className="text-left py-4">
                  Plan
                </th>

                <th className="text-left py-4">
                  Status
                </th>

                <th className="text-left py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {gyms.map((gym) => (
                <tr
                  key={gym.id}
                  className="border-b hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <td className="py-4 font-medium">
                    {gym.gym_name}
                  </td>

                  <td className="py-4">
                    {gym.owner_name}
                  </td>

                  <td className="py-4">
                    {gym.email}
                  </td>

                  <td className="py-4 capitalize">
                    {gym.subscription_plan}
                  </td>

                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      {gym.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          updateGymStatus(
                            gym.id,
                            "active"
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded-xl text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateGymStatus(
                            gym.id,
                            "suspended"
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded-xl text-sm"
                      >
                        Suspend
                      </button>

                      <button
                        onClick={() =>
                          deleteGym(gym.id)
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded-xl text-sm"
                      >
                        Delete
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