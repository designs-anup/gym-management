import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  if (user) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email:
            formData.email,
          password:
            formData.password,
        }
      );

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Login successful"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-[32px] p-10 shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Gym SaaS Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border"
          />

          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold">
            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}