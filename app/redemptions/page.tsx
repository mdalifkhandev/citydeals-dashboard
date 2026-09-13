const redemptions = [
  ["Buy 2 main dishes", "Nasimul Noyon", "Kendall Coffee House", "Kendall", "Today 10:12"],
  ["Weekend BOGO", "Maya Carter", "Brew Lab", "Miami Lakes", "Today 09:44"],
  ["Free dessert", "Omar Lee", "Sunset Grill", "Sarasota", "Yesterday"],
];

export default function RedemptionsPage() {
  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h1 className="text-2xl font-semibold text-slate-900">Coupon Redemptions</h1>
        <p className="mt-1 text-sm leading-5 text-slate-500">
          Review redeemed coupons by user, business, area and timestamp.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Today: 18", "This week: 126", "This month: 410", "Top area: Kendall"].map((item) => (
            <div
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium leading-5 sm:p-4"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 lg:hidden">
          {redemptions.map(([coupon, user, business, area, redeemed]) => (
            <article
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
              key={`${coupon}-${user}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold leading-5 text-slate-900">{coupon}</h2>
                  <p className="mt-1 text-xs leading-4 text-slate-500">{redeemed}</p>
                </div>
                <span className="shrink-0 rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                  Redeemed
                </span>
              </div>
              <div className="mt-3 grid gap-2 rounded-lg bg-slate-50 p-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">User</span>
                  <strong className="text-right font-medium text-slate-900">{user}</strong>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Business</span>
                  <strong className="text-right font-medium text-slate-900">{business}</strong>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Area</span>
                  <strong className="text-right font-medium text-slate-900">{area}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 hidden overflow-hidden rounded-xl border border-slate-200 lg:block">
          <div className="grid grid-cols-[1.3fr_1fr_1.2fr_1fr_120px] bg-slate-100 text-sm text-[#315576]">
            {["Coupon", "User", "Business", "Area", "Redeemed"].map((h) => <div className="border-r border-slate-300 px-4 py-3 last:border-r-0" key={h}>{h}</div>)}
          </div>
          {redemptions.map((row) => <div className="grid grid-cols-[1.3fr_1fr_1.2fr_1fr_120px] border-t border-dashed border-slate-200 text-sm" key={row.join("-")}>{row.map((cell) => <div className="px-4 py-3" key={cell}>{cell}</div>)}</div>)}
        </div>
      </section>
    </div>
  );
}
