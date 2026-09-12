const sections = [
  ["Location label", "My Location · 23/B Kumapara, Sylhet", "Shown in Home header"],
  ["Search placeholder", "Search deals, stores, food...", "Shown under header"],
  ["Category row", "All, Shopping, Groceries, Electronics, Restaurants, Beauty", "Home filter tabs"],
  ["Empty state", "No deals available in this category", "When no coupon matches"],
];

export default function HomeContentPage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Mobile Home Content</h1>
            <p className="mt-1 text-sm text-slate-500">Control copy and visibility for home screen sections.</p>
          </div>
          <button className="h-11 rounded-xl bg-[#f97316] px-4 text-sm font-medium text-white">Save home content</button>
        </div>
        <div className="mt-5 grid gap-3">
          {sections.map(([label, value, note]) => (
            <label className="grid grid-cols-[180px_minmax(0,1fr)_260px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm" key={label}>
              <span className="font-medium text-slate-900">{label}</span>
              <input className="h-10 rounded-lg border border-slate-200 bg-white px-3" defaultValue={value} />
              <span className="text-slate-500">{note}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
