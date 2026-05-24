import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";

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
    </div>
  );
}