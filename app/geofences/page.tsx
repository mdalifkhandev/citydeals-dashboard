const geofences = [
  ["Kendall Coffee House", "Kendall", "300 m", "25.6862", "-80.3131", "Active"],
  ["Burger Hub", "Miami Lakes", "500 m", "25.9081", "-80.3087", "Active"],
  ["Sunset Grill", "Sarasota", "300 m", "27.3364", "-82.5307", "Paused"],
];

export default function GeofencesPage() {
  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Nearby / Geofence Settings</h1>
            <p className="mt-1 text-sm text-slate-500">Tune merchant proximity radius used by the Nearby tab and push engine.</p>
          </div>
          <button className="h-11 rounded-xl bg-[#f97316] px-4 text-sm font-medium text-white">Add geofence</button>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-[1.4fr_1fr_110px_110px_110px_100px] bg-slate-100 text-sm text-[#315576]">
            {["Business", "Area", "Radius", "Latitude", "Longitude", "Status"].map((h) => <div className="border-r border-slate-300 px-4 py-3 last:border-r-0" key={h}>{h}</div>)}
          </div>
          {geofences.map((row) => <div className="grid grid-cols-[1.4fr_1fr_110px_110px_110px_100px] border-t border-dashed border-slate-200 text-sm" key={row.join("-")}>{row.map((cell) => <div className="px-4 py-3" key={cell}>{cell}</div>)}</div>)}
        </div>
      </section>
    </div>
  );
}
