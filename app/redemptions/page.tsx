const redemptions = [
  ["Buy 2 main dishes", "Nasimul Noyon", "Kendall Coffee House", "Kendall", "Today 10:12"],
  ["Weekend BOGO", "Maya Carter", "Brew Lab", "Miami Lakes", "Today 09:44"],
  ["Free dessert", "Omar Lee", "Sunset Grill", "Sarasota", "Yesterday"],
];

export default function RedemptionsPage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h1 className="text-2xl font-semibold text-slate-900">Coupon Redemptions</h1>
        <p className="mt-1 text-sm text-slate-500">Review redeemed coupons by user, business, area and timestamp.</p>
        <div className="mt-5 grid grid-cols-4 gap-4">
          {["Today: 18", "This week: 126", "This month: 410", "Top area: Kendall"].map((item) => <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium" key={item}>{item}</div>)}
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-[1.3fr_1fr_1.2fr_1fr_120px] bg-slate-100 text-sm text-[#315576]">
            {["Coupon", "User", "Business", "Area", "Redeemed"].map((h) => <div className="border-r border-slate-300 px-4 py-3 last:border-r-0" key={h}>{h}</div>)}
          </div>
          {redemptions.map((row) => <div className="grid grid-cols-[1.3fr_1fr_1.2fr_1fr_120px] border-t border-dashed border-slate-200 text-sm" key={row.join("-")}>{row.map((cell) => <div className="px-4 py-3" key={cell}>{cell}</div>)}</div>)}
        </div>
      </section>
    </div>
  );
}
