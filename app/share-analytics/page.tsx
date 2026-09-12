const shares = [
  ["Buy 2 main dishes", "SMS", "142", "38", "26.8%"],
  ["Weekend BOGO", "Facebook", "86", "24", "27.9%"],
  ["Free dessert", "Email", "54", "18", "33.3%"],
  ["Coffee refill", "Instagram", "39", "11", "28.2%"],
  ["Smart Tech Discount", "TikTok", "22", "5", "22.7%"],
];

export default function ShareAnalyticsPage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h1 className="text-2xl font-semibold text-slate-900">Coupon Share Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Track coupon sharing by SMS, email and social channels.</p>
        <div className="mt-5 grid grid-cols-5 gap-4">
          {["SMS 142", "Email 54", "Facebook 86", "Instagram 39", "TikTok 22"].map((metric) => <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium" key={metric}>{metric}</div>)}
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-[1.5fr_130px_120px_120px_120px] bg-slate-100 text-sm text-[#315576]">
            {["Coupon", "Channel", "Shares", "Opens", "Open rate"].map((h) => <div className="border-r border-slate-300 px-4 py-3 last:border-r-0" key={h}>{h}</div>)}
          </div>
          {shares.map((row) => <div className="grid grid-cols-[1.5fr_130px_120px_120px_120px] border-t border-dashed border-slate-200 text-sm" key={row.join("-")}>{row.map((cell) => <div className="px-4 py-3" key={cell}>{cell}</div>)}</div>)}
        </div>
      </section>
    </div>
  );
}
