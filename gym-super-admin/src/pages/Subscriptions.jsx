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

  /* Modal Section */
  const [showModal, setShowModal] =
  useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      price: "",
      branches_limit: "",
      members_limit: "",
    });

  useEffect(() => {
    fetchData();
  }, []);

  // Edit plan
  const [editingPlan, setEditingPlan] =
  useState(null);

  const savePlan = async () => {
    try {
      if (editingPlan) {
        // UPDATE
        const { error } =
          await supabase
            .from(
              "subscription_plans"
            )
            .update({
              name:
                formData.name,
              price:
                formData.price,
              branches_limit:
                formData.branches_limit,
              members_limit:
                formData.members_limit,
            })
            .eq(
              "id",
              editingPlan.id
            );

        if (error)
          throw error;
      } else {
        // CREATE
        const { error } =
          await supabase
            .from(
              "subscription_plans"
            )
            .insert([
              formData,
            ]);

        if (error)
          throw error;
      }

      setShowModal(false);
      setEditingPlan(null);

      setFormData({
        name: "",
        price: "",
        branches_limit:
          "",
        members_limit:
          "",
      });

      fetchData();
        } catch (err) {
          console.error(err);
          alert(
            "Failed to save plan"
          );
        }
      };

      const handleEdit = (
        plan
      ) => {
        setEditingPlan(plan);

        setFormData({
          name: plan.name,
          price: plan.price,
          branches_limit:
            plan.branches_limit,
          members_limit:
            plan.members_limit,
        });

        setShowModal(true);
      };

      /* --End Modal */

      const [showSubscriptionModal, setShowSubscriptionModal] =
        useState(false);

      const [editingSubscription, setEditingSubscription] =
        useState(null);

      const [gyms, setGyms] = useState([]);

      const [subscriptionForm, setSubscriptionForm] =
        useState({
          gym_id: "",
          plan_name: "",
          amount: "",
          start_date: "",
          end_date: "",
          status: "active",
        });  

      const fetchData = async () => {
        try {
          setLoading(true);

          // Fetch Plans
          const {
            data: plansData,
            error: plansError,
          } = await supabase
            .from("subscription_plans")
            .select("*");

          if (plansError) throw plansError;

          // Fetch Gyms
          const {
            data: gymsData,
            error: gymsError,
          } = await supabase
            .from("gyms")
            .select("*");

          console.log("GYMS:", gymsData);

          if (gymsError) throw gymsError;

          // Fetch subscriptions
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
          setGyms(gymsData || []);
          setSubscriptions(
            subscriptionsData || []
          );

        } catch (err) {
          console.error(
            "FETCH ERROR:",
            err
          );
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

  const saveSubscription =
  async () => {
    try {
      if (
        editingSubscription
      ) {
        const { error } =
          await supabase
            .from(
              "subscriptions"
            )
            .update(
              subscriptionForm
            )
            .eq(
              "id",
              editingSubscription.id
            );

        if (error)
          throw error;
      } else {
        const { error } =
          await supabase
            .from(
              "subscriptions"
            )
            .insert([
              subscriptionForm,
            ]);

        if (error)
          throw error;
      }

      setShowSubscriptionModal(
        false
      );

      setEditingSubscription(
        null
      );

      setSubscriptionForm({
        gym_id: "",
        plan_name: "",
        amount: "",
        start_date: "",
        end_date: "",
        status:
          "active",
      });

      fetchData();
    } catch (err) {
      console.error(err);
      alert(
        "Failed to save subscription"
      );
    }
  };

  const handleEditSubscription =
  (subscription) => {
    setEditingSubscription(
      subscription
    );

    setSubscriptionForm({
      gym_id:
        subscription.gym_id,
      plan_name:
        subscription.plan_name,
      amount:
        subscription.amount,
      start_date:
        subscription.start_date,
      end_date:
        subscription.end_date,
      status:
        subscription.status,
    });

    setShowSubscriptionModal(
      true
    );
  };

  const deleteSubscription =
  async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this subscription?"
      );

    if (!confirmDelete)
      return;

    try {
      const { error } =
        await supabase
          .from(
            "subscriptions"
          )
          .delete()
          .eq("id", id);

      if (error)
        throw error;

      fetchData();
    } catch (err) {
      console.error(err);
      alert(
        "Failed to delete subscription"
      );
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

        <div className="flex gap-3">
          <button
            onClick={() =>
              setShowSubscriptionModal(true)
            }
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md"
          >
            <Plus size={20} />
            Assign Subscription
          </button>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md"
          >
            <Plus size={20} />
            Create Plan
          </button>
        </div>

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
                    <button
                      onClick={() =>
                        handleEdit(plan)
                      }
                      className="p-2 rounded-xl bg-green-100 text-green-600"
                    >
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
                <th className="p-5">Actions</th>
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
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleEditSubscription(
                            item
                          )
                        }
                        className="bg-green-100 text-green-600 p-2 rounded-lg"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          deleteSubscription(
                            item.id
                          )
                        }
                        className="bg-red-100 text-red-600 p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingPlan
              ? "Edit Plan"
              : "Create Plan"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Plan Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target
                        .value,
                  })
                }
                className="w-full border rounded-xl p-4"
              />

              <input
                type="number"
                placeholder="Price"
                value={
                  formData.price
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price:
                      e.target
                        .value,
                  })
                }
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                placeholder="Branches Limit"
                value={
                  formData.branches_limit
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    branches_limit:
                      e.target
                        .value,
                  })
                }
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                placeholder="Members Limit"
                value={
                  formData.members_limit
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    members_limit:
                      e.target
                        .value,
                  })
                }
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="px-5 py-3 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={
                  savePlan
                }
                className="bg-blue-600 text-white px-5 py-3 rounded-xl"
              >
                {editingPlan
                ? "Update Plan"
                : "Save Plan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingSubscription
                ? "Edit Subscription"
                : "Assign Subscription"}
            </h2>

            <div className="space-y-4">

              <select
                value={
                  subscriptionForm.gym_id
                }
                onChange={(e) =>
                  setSubscriptionForm({
                    ...subscriptionForm,
                    gym_id:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Gym
                </option>

                {gyms?.length > 0 &&
                  gyms.map((gym) => (
                    <option
                      key={gym.id}
                      value={gym.id}
                    >
                      {gym.gym_name || gym.name}
                    </option>
                ))}
              </select>

              <select
                value={
                  subscriptionForm.plan_name
                }
                onChange={(e) => {
                  const selectedPlan =
                    plans.find(
                      (p) =>
                        p.name ===
                        e.target.value
                    );

                  setSubscriptionForm({
                    ...subscriptionForm,
                    plan_name:
                      e.target.value,
                    amount:
                      selectedPlan?.price ||
                      "",
                  });
                }}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Plan
                </option>

                {plans.map((plan) => (
                  <option
                    key={plan.id}
                    value={plan.name}
                  >
                    {plan.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Amount"
                value={
                  subscriptionForm.amount
                }
                readOnly
                className="w-full border rounded-xl p-4 bg-slate-100"
              />

              <input
                type="date"
                value={
                  subscriptionForm.start_date
                }
                onChange={(e) =>
                  setSubscriptionForm({
                    ...subscriptionForm,
                    start_date:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl p-4"
              />

              <input
                type="date"
                value={
                  subscriptionForm.end_date
                }
                onChange={(e) =>
                  setSubscriptionForm({
                    ...subscriptionForm,
                    end_date:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl p-4"
              />

              <select
                value={
                  subscriptionForm.status
                }
                onChange={(e) =>
                  setSubscriptionForm({
                    ...subscriptionForm,
                    status:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl p-4"
              >
                <option value="active">
                  Active
                </option>
                <option value="trial">
                  Trial
                </option>
                <option value="expired">
                  Expired
                </option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  setShowSubscriptionModal(
                    false
                  )
                }
                className="px-5 py-3 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={
                  saveSubscription
                }
                className="bg-green-600 text-white px-5 py-3 rounded-xl"
              >
                {editingSubscription
                  ? "Update"
                  : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}