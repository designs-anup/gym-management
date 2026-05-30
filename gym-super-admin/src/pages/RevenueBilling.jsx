import {
  Wallet,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Download,
  Filter,
  FileText,
} from "lucide-react";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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

const monthlyRevenue = payments.reduce(
  (acc, item) => {
    const month = new Date(
      item.created_at
    ).toLocaleString(
      "default",
      {
        month: "short",
      }
    );

    const existing =
      acc.find(
        (m) =>
          m.month ===
          month
      );

    if (existing) {
      existing.revenue +=
        Number(
          item.amount
        );
    } else {
      acc.push({
        month,
        revenue:
          Number(
            item.amount
          ),
      });
    }

    return acc;
  },
  []
);

const planRevenue =
  payments.reduce(
    (acc, item) => {
      const existing =
        acc.find(
          (p) =>
            p.plan ===
            item.plan_name
        );

      if (existing) {
        existing.amount +=
          Number(
            item.amount
          );
      } else {
        acc.push({
          plan:
            item.plan_name,
          amount:
            Number(
              item.amount
            ),
        });
      }

      return acc;
    },
    []
  );

const paymentStatusData =
  [
    {
      name: "Paid",
      value:
        payments.filter(
          (p) =>
            p.payment_status ===
            "paid"
        ).length,
    },

    {
      name:
        "Pending",
      value:
        payments.filter(
          (p) =>
            p.payment_status ===
            "pending"
        ).length,
    },

    {
      name:
        "Failed",
      value:
        payments.filter(
          (p) =>
            p.payment_status ===
            "failed"
        ).length,
    },
  ];

const COLORS = [
  "#16a34a",
  "#eab308",
  "#dc2626",
];  

const generateInvoice =
  (payment) => {

    const win =
      window.open(
        "",
        "_blank"
      );

    win.document.write(`
      <html>
      <head>
        <title>
          Payment Invoice
        </title>

        <style>
          body{
            font-family:Arial;
            padding:40px;
            color:#0f172a;
          }

          .card{
            border:1px solid #e2e8f0;
            padding:30px;
            border-radius:20px;
            max-width:700px;
            margin:auto;
          }

          h1{
            color:#2563eb;
          }

          table{
            width:100%;
            margin-top:20px;
            border-collapse:collapse;
          }

          td,th{
            border:1px solid #ddd;
            padding:12px;
          }

          button{
            margin-top:20px;
            background:#16a34a;
            color:white;
            border:none;
            padding:12px 18px;
            border-radius:10px;
            cursor:pointer;
          }

          @media print {
            button{
              display:none;
            }
          }
        </style>
      </head>

      <body>

      <div class="card">

      <h1>
        Revenue Invoice
      </h1>

      <p>
        Date:
        ${new Date().toLocaleDateString()}
      </p>

      <table>
        <tr>
          <th>Gym</th>
          <td>
            ${
              payment
                .gyms
                ?.gym_name
            }
          </td>
        </tr>

        <tr>
          <th>Owner</th>
          <td>
            ${
              payment
                .gyms
                ?.owner_name
            }
          </td>
        </tr>

        <tr>
          <th>Plan</th>
          <td>
            ${
              payment.plan_name
            }
          </td>
        </tr>

        <tr>
          <th>Amount</th>
          <td>
            ₹${
              payment.amount
            }
          </td>
        </tr>

        <tr>
          <th>Status</th>
          <td>
            ${
              payment.payment_status
            }
          </td>
        </tr>
      </table>

      <button
        onclick="window.print()"
      >
        Print Invoice
      </button>

      </div>
      </body>
      </html>
    `);

    win.document.close();
  };

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
          <button 
            onClick={() => {
              setSearch("");
              setStatusFilter(
                "all"
              );
            }}
            className="border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-100">
            <Filter size={18} />
            Reset Filters
          </button>

          <button 
            onClick={() => {
              const csv =
                filteredPayments.map(
                  (p) => ({
                    Gym:
                      p.gyms
                        ?.gym_name,

                    Owner:
                      p.gyms
                        ?.owner_name,

                    Plan:
                      p.plan_name,

                    Amount:
                      p.amount,

                    Billing:
                      p.billing_cycle,

                    Status:
                      p.payment_status,

                    Date:
                      new Date(
                        p.created_at
                      ).toLocaleDateString(),
                  })
                );

              const csvContent =
                [
                  Object.keys(
                    csv[0] ||
                      {}
                  ).join(","),

                  ...csv.map(
                    (row) =>
                      Object.values(
                        row
                      ).join(",")
                  ),
                ].join("\n");

              const blob =
                new Blob(
                  [csvContent],
                  {
                    type: "text/csv",
                  }
                );

              const url =
                window.URL.createObjectURL(
                  blob
                );

              const a =
                document.createElement(
                  "a"
                );

              a.href = url;

              a.download =
                "revenue-report.csv";

              a.click();
            }}
            className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Search/filter section */}
      <div className="bg-white rounded-3xl border p-5 flex flex-col lg:flex-row gap-4 justify-between">

        <input
          type="text"
          placeholder="Search gym..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border rounded-2xl px-5 py-3 w-full lg:w-80"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border rounded-2xl px-5 py-3"
        >
          <option value="all">
            All Status
          </option>

          <option value="paid">
            Paid
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="failed">
            Failed
          </option>
        </select>
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

      {/* Charts section */}  
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Revenue Trend */}
        <div className="bg-white rounded-3xl border p-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-5">
            Revenue Growth
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <AreaChart
              data={
                monthlyRevenue
              }
            >
              <defs>
                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563eb"
                    stopOpacity={
                      0.4
                    }
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={
                      0
                    }
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-3xl border p-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-5">
            Payment Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={
                  paymentStatusData
                }
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {paymentStatusData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Plan */}
        <div className="bg-white rounded-3xl border p-6 shadow-sm xl:col-span-2">

          <h2 className="text-2xl font-bold mb-5">
            Revenue by Plan
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={planRevenue}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="plan"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="amount"
                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
                        <button 
                          onClick={() =>
                            generateInvoice(
                              payment
                            )
                          }
                          className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition">
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