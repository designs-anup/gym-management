import { ArrowUpRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  growth,
  icon: Icon,
  color,
}) {
  return (
    <div className="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-[30px] p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-800 dark:text-white">
            {value}
          </h2>

          <div className="flex items-center gap-2 mt-4 text-green-600 font-medium">
            <ArrowUpRight size={18} />
            {growth}
          </div>
        </div>

        <div
          className={`w-16 h-16 rounded-[22px] bg-gradient-to-r ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon
            size={30}
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
}