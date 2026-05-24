import {
  Settings as SettingsIcon,
  Globe,
  CreditCard,
  Mail,
  Database,
  Palette,
  Save,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-slate-800">
          Platform Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage SaaS platform configurations
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Platform Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Platform Settings
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-slate-600 mb-2">
                Platform Name
              </label>

              <input
                type="text"
                defaultValue="Gym SaaS Pro"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-2">
                Currency
              </label>

              <select className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-2">
                Timezone
              </label>

              <select className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500">
                <option>Asia/Kolkata</option>
                <option>UTC</option>
                <option>America/New_York</option>
              </select>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Branding
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-slate-600 mb-2">
                Brand Logo
              </label>

              <input
                type="file"
                className="w-full border border-slate-200 rounded-2xl p-3"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-2">
                Theme Mode
              </label>

              <select className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500">
                <option>Light</option>
                <option>Dark</option>
                <option>System Default</option>
              </select>
            </div>
          </div>
        </div>

        {/* SMTP Setup */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              SMTP Email Setup
            </h2>
          </div>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="SMTP Host"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="SMTP Password"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3"
            />
          </div>
        </div>

        {/* Payment Gateway */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Payment Gateway
            </h2>
          </div>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Razorpay Key"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="Secret Key"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3"
            />
          </div>
        </div>

        {/* Storage */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-red-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Storage Settings
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Storage Bucket Name"
              className="border border-slate-200 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Backup Frequency"
              className="border border-slate-200 rounded-2xl px-4 py-3"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl flex items-center gap-2 shadow-md">
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}