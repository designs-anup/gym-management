import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Crown,
  Star,
  Gem,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";

export default function Subscriptions() {
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Seed default plans (only once)
      const defaultPlans = [
        {
          name: "Basic",
          price: 999,
          branches_limit: "1 Branch",
          members_limit: "500 Members",
        },
        {
          name: "Standard",
          price: 2499,
          branches_limit: "3 Branches",
          members_limit: "1500 Members",
        },
        {
          name: "Premium",
          price: 4999,
          branches_limit: "Unlimited",
          members_limit: "Unlimited Members",
        },
      ];

      await supabase
        .from("subscription_plans")
        .upsert(defaultPlans, {
          onConflict: "name",
        });

      // Fetch Plans
      const { data: plansData, error: plansError } =
        await supabase
          .from("subscription_plans")
          .select("*");

      if (plansError) throw plansError;

      // Fetch subscriptions with gym relation
      const {
        data: subscriptionsData,
        error: subscriptionsError,
      } = await supabase
        .from("subscriptions")
        .select(`
          *,
          gyms (
            gym_name,
            owner_name
          )
        `);

      if (subscriptionsError)
        throw subscriptionsError;

      setPlans(plansData || []);
      setSubscriptions(subscriptionsData || []);

      console.log("PLANS:", plansData);
      console.log(
        "SUBSCRIPTIONS:",
        subscriptionsData
      );
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this plan?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("subscription_plans")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete");
      return;
    }

    fetchData();
  };

  const getPlanIcon = (planName) => {
    switch (planName?.toLowerCase()) {
      case "basic":
        return Star;
      case "standard":
        return Crown;
      case "premium":
        return Gem;
      default:
        return Star;
    }
  };

  const getPlanColor = (planName) => {
    switch (planName?.toLowerCase()) {
      case "basic":
        return "bg-blue-100 text-blue-600";

      case "standard":
        return "bg-yellow-100 text-yellow-600";

      case "premium":
        return "bg-purple-100 text-purple-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

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
      {loading ? (
        <div>Loading plans...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = getPlanIcon(
              plan.name
            );

            return (
              <div
                key={plan.id}
                className="bg-white rounded-3xl shadow-sm border border-slate-100 p-7 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getPlanColor(
                      plan.name
                    )}`}
                  >
                    <Icon size={28} />
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 rounded-xl bg-green-100 text-green-600">
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        deletePlan(plan.id)
                      }
                      className="p-2 rounded-xl bg-red-100 text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                  {plan.name}
                </h2>

                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ₹{plan.price}
                  </span>

                  <span className="text-slate-500">
                    /month
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle
                      size={18}
                      className="text-green-500"
                    />
                    {plan.branches_limit}
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle
                      size={18}
                      className="text-green-500"
                    />
                    {plan.members_limit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
              {subscriptions.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {item.gyms?.gym_name}
                  </td>

                  <td className="p-5">
                    {item.gyms?.owner_name}
                  </td>

                  <td className="p-5">
                    {item.plan_name}
                  </td>

                  <td className="p-5">
                    {item.billing_cycle}
                  </td>

                  <td className="p-5">
                    {item.end_date
                      ? new Date(
                          item.end_date
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        item.status ===
                        "active"
                          ? "bg-green-100 text-green-700"
                          : item.status ===
                            "trial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}

              {subscriptions.length ===
                0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-8 text-slate-500"
                  >
                    No subscriptions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}