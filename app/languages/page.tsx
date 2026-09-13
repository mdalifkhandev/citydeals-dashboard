const languages = [
  { name: "English (US)", code: "en", region: "United States", enabled: true },
  { name: "Español", code: "es", region: "Spain", enabled: true },
  { name: "Português", code: "pt", region: "Portugal", enabled: true },
];

export default function LanguagesPage() {
  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Languages</h1>
            <p className="mt-1 text-sm text-slate-500">Control supported app languages and translation readiness.</p>
          </div>
          <button className="h-11 rounded-xl bg-[#f97316] px-4 text-sm font-medium text-white">Add language</button>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-[1.5fr_100px_1fr_120px_90px] bg-slate-100 text-sm text-[#315576]">
            {["Language", "Code", "Region", "Status", "Actions"].map((h) => <div className="border-r border-slate-300 px-4 py-3 last:border-r-0" key={h}>{h}</div>)}
          </div>
          {languages.map((lang) => (
            <div className="grid grid-cols-[1.5fr_100px_1fr_120px_90px] border-t border-dashed border-slate-200 text-sm" key={lang.code}>
              <div className="px-4 py-3 font-medium">{lang.name}</div>
              <div className="px-4 py-3">{lang.code}</div>
              <div className="px-4 py-3">{lang.region}</div>
              <div className="px-4 py-3"><span className="rounded bg-emerald-100 px-2 py-1 text-xs text-emerald-700">Enabled</span></div>
              <div className="px-4 py-3 text-center">...</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
