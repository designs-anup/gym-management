import {
  Wallet,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Download,
  Filter,
  FileText,
} from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RevenueBilling() {

  const [payments, setPayments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const fetchPayments =
    async () => {
      try {
        setLoading(true);

        const {
          data,
          error,
        } = await supabase
          .from(
            "subscription_payments"
          )
          .select(`
            *,
            gyms (
              gym_name,
              owner_name
            )
          `)
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

        if (error)
          throw error;

        setPayments(
          data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments =
    payments.filter(
      (payment) => {
        const gym =
          payment.gyms?.gym_name
            ?.toLowerCase() ||
          "";

        const matchesSearch =
          gym.includes(
            search.toLowerCase()
          );

        const matchesStatus =
          statusFilter ===
          "all"
            ? true
            : payment.payment_status ===
              statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  const revenueStats = [
    {
      title:
        "Total Revenue",

      value: `₹${payments.reduce(
        (sum, item) =>
          sum +
          Number(
            item.amount || 0
          ),
        0
      )}`,

      icon: Wallet,

      color:
        "bg-green-100 text-green-600",
    },

    {
      title:
        "Paid Payments",

      value:
        payments.filter(
          (p) =>
            p.payment_status ===
            "paid"
        ).length,

      icon:
        TrendingUp,

      color:
        "bg-blue-100 text-blue-600",
    },

    {
      title:
        "Pending Payments",

      value:
        payments.filter(
          (p) =>
            p.payment_status ===
            "pending"
        ).length,

      icon:
        AlertCircle,

      color:
        "bg-yellow-100 text-yellow-600",
    },

    {
      title:
        "Failed Payments",

      value:
        payments.filter(
          (p) =>
            p.payment_status ===
            "failed"
        ).length,

      icon:
        CreditCard,

      color:
        "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Revenue & Billing
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor subscriptions and revenue
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-100">
            <Filter size={18} />
            Filter
          </button>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {revenueStats.map(
          (item, index) => {
            const Icon =
              item.icon;

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
                    <Icon
                      size={28}
                    />
                  </div>

                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Payment Logs */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Payment Logs
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-slate-600">
                <th className="p-5">
                  Gym
                </th>

                <th className="p-5">
                  Owner
                </th>

                <th className="p-5">
                  Plan
                </th>

                <th className="p-5">
                  Amount
                </th>

                <th className="p-5">
                  Billing
                </th>

                <th className="p-5">
                  Date
                </th>

                <th className="p-5">
                  Status
                </th>

                <th className="p-5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-8"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredPayments.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-8 text-slate-500"
                  >
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map(
                  (
                    payment
                  ) => (
                    <tr
                      key={
                        payment.id
                      }
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-5 font-semibold">
                        {
                          payment
                            .gyms
                            ?.gym_name
                        }
                      </td>

                      <td className="p-5">
                        {
                          payment
                            .gyms
                            ?.owner_name
                        }
                      </td>

                      <td className="p-5">
                        {
                          payment.plan_name
                        }
                      </td>

                      <td className="p-5 font-semibold">
                        ₹
                        {
                          payment.amount
                        }
                      </td>

                      <td className="p-5 capitalize">
                        {
                          payment.billing_cycle
                        }
                      </td>

                      <td className="p-5">
                        {new Date(
                          payment.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            payment.payment_status ===
                            "paid"
                              ? "bg-green-100 text-green-700"
                              : payment.payment_status ===
                                "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {
                            payment.payment_status
                          }
                        </span>
                      </td>

                      <td className="p-5">
                        <button className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                          <FileText
                            size={
                              18
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}