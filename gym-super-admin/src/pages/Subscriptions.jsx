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
          billing_cycle: "monthly",
          auto_renew: true,
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
                
          const updatedSubscriptions =
            (subscriptionsData || []).map(
              (subscription) => {

                const today =
                  new Date();

                const expiryDate =
                  new Date(
                    subscription.end_date
                  );

                if (
                  subscription.status !==
                    "expired" &&
                  expiryDate < today
                ) {
                  return {
                    ...subscription,
                    status: "expired",
                  };
                }

                return subscription;
              }
            );

            const expiredItems =
              subscriptionsData?.filter(
                (subscription) => {

                  const today =
                    new Date();

                  const expiryDate =
                    new Date(
                      subscription.end_date
                    );

                  return (
                    subscription.status !==
                      "expired" &&
                    expiryDate < today
                  );
                }
              ) || [];

            for (const item of expiredItems) {
              await supabase
                .from("subscriptions")
                .update({
                  status: "expired",
                })
                .eq("id", item.id);
            }

          setSubscriptions(
            updatedSubscriptions
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
        billing_cycle: "monthly",
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
      billing_cycle:
        subscription.billing_cycle || "monthly",
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

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const filteredSubscriptions =
    subscriptions.filter((item) => {

      const gymName =
        item.gyms?.gym_name?.toLowerCase() || "";

      const matchesSearch =
        gymName.includes(
          search.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "all"
          ? true
          : item.status ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
  });
  
  const renewSubscription =
    async (subscription) => {
      try {
        const start =
          new Date();

        const expiry =
          new Date(start);

        switch (
          subscription.billing_cycle
        ) {
          case "monthly":
            expiry.setMonth(
              expiry.getMonth() + 1
            );
            break;

          case "quarterly":
            expiry.setMonth(
              expiry.getMonth() + 3
            );
            break;

          case "yearly":
            expiry.setFullYear(
              expiry.getFullYear() + 1
            );
            break;

          default:
            expiry.setMonth(
              expiry.getMonth() + 1
            );
        }

        const { error } =
          await supabase
            .from("subscriptions")
            .update({
              start_date:
                start
                  .toISOString()
                  .split("T")[0],

              end_date:
                expiry
                  .toISOString()
                  .split("T")[0],

              status: "active",
            })
            .eq(
              "id",
              subscription.id
            );

        if (error)
          throw error;

        fetchData();

      } catch (err) {
        console.error(err);
        alert(
          "Failed to renew"
        );
      }
    };

    const generateInvoice =
      (subscription) => {

        const invoiceWindow =
          window.open(
            "",
            "_blank"
          );

        invoiceWindow.document.write(`
          <html>
            <head>
              <title>Invoice</title>

              <style>
                body {
                  font-family: Arial;
                  padding: 40px;
                }

                h1 {
                  color: #16a34a;
                }

                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }

                td, th {
                  border: 1px solid #ccc;
                  padding: 12px;
                }
              </style>
            </head>

            <body>
              <h1>Gym Subscription Invoice</h1>

              <table>
                <tr>
                  <th>Gym</th>
                  <td>
                    ${
                      subscription.gyms
                        ?.gym_name
                    }
                  </td>
                </tr>

                <tr>
                  <th>Plan</th>
                  <td>
                    ${
                      subscription.plan_name
                    }
                  </td>
                </tr>

                <tr>
                  <th>Amount</th>
                  <td>
                    ₹${subscription.amount}
                  </td>
                </tr>

                <tr>
                  <th>Billing</th>
                  <td>
                    ${
                      subscription.billing_cycle
                    }
                  </td>
                </tr>

                <tr>
                  <th>Status</th>
                  <td>
                    ${
                      subscription.status
                    }
                  </td>
                </tr>
              </table>

              <script>
                window.print()
              </script>

            </body>
          </html>
        `);
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
            onClick={() => {
              setEditingPlan(null);

              setFormData({
                name: "",
                price: "",
                branches_limit: "",
                members_limit: "",
              });

              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md"
          >
            <Plus size={20} />
            Create Plan
          </button>
        </div>

      </div>

      <div className="p-6 border-b flex flex-col md:flex-row gap-4 justify-between">

        <input
          type="text"
          placeholder="Search gym..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-xl px-4 py-3 w-full md:w-80"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border rounded-xl px-4 py-3"
        >
          <option value="all">
            All Status
          </option>

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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h3 className="text-slate-500 text-sm">
            Active Subscriptions
          </h3>
          <h2 className="text-3xl font-bold mt-2">
            {
              subscriptions.filter(
                (s) => s.status === "active"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h3 className="text-slate-500 text-sm">
            Trial Gyms
          </h3>
          <h2 className="text-3xl font-bold mt-2">
            {
              subscriptions.filter(
                (s) => s.status === "trial"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h3 className="text-slate-500 text-sm">
            Expired
          </h3>
          <h2 className="text-3xl font-bold mt-2">
            {
              subscriptions.filter(
                (s) => s.status === "expired"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h3 className="text-slate-500 text-sm">
            Revenue
          </h3>
          <h2 className="text-3xl font-bold mt-2">
            ₹
            {subscriptions.reduce(
              (total, item) =>
                total +
                Number(item.amount || 0),
              0
            )}
          </h2>
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
                <th className="p-5">Amount</th>
                <th className="p-5">Auto Renew</th>
                <th className="p-5">Expiry</th>
                <th className="p-5">Status</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubscriptions.map((item) => (
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
                    {item.amount}
                  </td>

                  <td className="p-5">
                    {item.auto_renew ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Enabled
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                        Disabled
                      </span>
                    )}
                  </td>

                  <td className="p-5">
                    <div className="flex flex-col">
                      {(() => {
                        const today =
                          new Date();

                        const expiry =
                          new Date(
                            item.end_date
                          );

                        const diff =
                          Math.ceil(
                            (expiry - today) /
                            (1000 * 60 * 60 * 24)
                          );

                        if (
                          diff <= 7 &&
                          diff > 0
                        ) {
                          return (
                            <span className="text-xs text-orange-500 mt-1">
                              Expiring Soon
                            </span>
                          );
                        }

                        return null;
                      })()}
                    </div>  
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "trial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex gap-2 flex-wrap">

                      {/* Edit */}
                      <button
                        onClick={() =>
                          handleEditSubscription(item)
                        }
                        className="bg-green-100 text-green-600 p-2 rounded-lg"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          deleteSubscription(item.id)
                        }
                        className="bg-red-100 text-red-600 p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>

                      {/* Renew */}
                      <button
                        onClick={() =>
                          renewSubscription(item)
                        }
                        className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium"
                      >
                        Renew
                      </button>

                      {/* Invoice */}
                      <button
                        onClick={() =>
                          generateInvoice(item)
                        }
                        className="bg-purple-100 text-purple-600 px-3 py-2 rounded-lg text-sm font-medium"
                      >
                        Invoice
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
                onClick={() => {
                  setShowModal(false);
                  setEditingPlan(null);

                  setFormData({
                    name: "",
                    price: "",
                    branches_limit: "",
                    members_limit: "",
                  });
                }}
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
                value={subscriptionForm.plan_name}
                onChange={(e) => {
                  const selectedPlan =
                    plans.find(
                      (p) =>
                        p.name === e.target.value
                    );

                  const today =
                    subscriptionForm.start_date
                      ? new Date(
                          subscriptionForm.start_date
                        )
                      : new Date();

                  const expiry =
                    new Date(today);

                  switch (
                    subscriptionForm.billing_cycle
                  ) {
                    case "monthly":
                      expiry.setMonth(
                        expiry.getMonth() + 1
                      );
                      break;

                    case "quarterly":
                      expiry.setMonth(
                        expiry.getMonth() + 3
                      );
                      break;

                    case "yearly":
                      expiry.setFullYear(
                        expiry.getFullYear() + 1
                      );
                      break;

                    default:
                      expiry.setMonth(
                        expiry.getMonth() + 1
                      );
                  }

                  setSubscriptionForm({
                    ...subscriptionForm,
                    plan_name:
                      e.target.value,
                    amount:
                      selectedPlan?.price ||
                      "",
                    start_date:
                      today
                        .toISOString()
                        .split("T")[0],
                    end_date:
                      expiry
                        .toISOString()
                        .split("T")[0],
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

              <select
                value={
                  subscriptionForm.billing_cycle
                }
                onChange={(e) =>
                  setSubscriptionForm({
                    ...subscriptionForm,
                    billing_cycle:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl p-4"
              >
                <option value="monthly">
                  Monthly
                </option>

                <option value="quarterly">
                  Quarterly
                </option>

                <option value="yearly">
                  Yearly
                </option>
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
                readOnly
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

              <div className="flex items-center justify-between border rounded-xl p-4">
                <div>
                  <h3 className="font-semibold">
                    Auto Renewal
                  </h3>

                  <p className="text-sm text-slate-500">
                    Automatically renew subscription
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSubscriptionForm({
                      ...subscriptionForm,
                      auto_renew:
                        !subscriptionForm.auto_renew,
                    })
                  }
                  className={`w-14 h-8 rounded-full transition relative ${
                    subscriptionForm.auto_renew
                      ? "bg-green-500"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${
                      subscriptionForm.auto_renew
                        ? "left-7"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowSubscriptionModal(false);
                  setEditingSubscription(null);

                  setSubscriptionForm({
                    gym_id: "",
                    plan_name: "",
                    amount: "",
                    billing_cycle: "monthly",
                    start_date: "",
                    end_date: "",
                    status: "active",
                  });
                }}
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