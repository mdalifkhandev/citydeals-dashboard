const saved = [
  ["Nasimul Noyon", "Buy 2 main dishes", "Kendall Coffee House", "Kendall", "2 min ago"],
  ["Leila Park", "Nationwide Fast Food Deals", "Burger Hub", "Miami Lakes", "18 min ago"],
  ["Ravi Singh", "Smart Tech Discount", "Tech Hub", "Sarasota", "1 hour ago"],
];

export default function SavedActivityPage() {
  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h1 className="text-2xl font-semibold text-slate-900">Saved Coupons / User Activity</h1>
        <p className="mt-1 text-sm text-slate-500">See which users save offers and which coupons perform best.</p>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-[1fr_1.4fr_1.2fr_1fr_120px] bg-slate-100 text-sm text-[#315576]">
            {["User", "Coupon", "Business", "Area", "Saved"].map((h) => <div className="border-r border-slate-300 px-4 py-3 last:border-r-0" key={h}>{h}</div>)}
          </div>
          {saved.map((row) => <div className="grid grid-cols-[1fr_1.4fr_1.2fr_1fr_120px] border-t border-dashed border-slate-200 text-sm" key={row.join("-")}>{row.map((cell) => <div className="px-4 py-3" key={cell}>{cell}</div>)}</div>)}
        </div>
      </section>
    </div>
  );
}
