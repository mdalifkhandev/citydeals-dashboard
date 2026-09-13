const qrCodes = [
  ["Kendall", "/directory/kendall", "Ready", "Last generated today"],
  ["Miami Lakes", "/directory/miami-lakes", "Ready", "Last generated yesterday"],
  ["Sarasota", "/directory/sarasota", "Needs update", "Slug changed"],
];

export default function QrCodesPage() {
  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Area QR Codes</h1>
            <p className="mt-1 text-sm text-slate-500">Manage branded QR codes that open isolated area directories.</p>
          </div>
          <button className="h-11 rounded-xl bg-[#f97316] px-4 text-sm font-medium text-white">Regenerate selected</button>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {qrCodes.map(([area, link, status, note]) => (
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={area}>
              <div className="grid h-40 place-items-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-500">QR preview</div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{area}</h2>
              <p className="text-sm text-slate-600">{link}</p>
              <div className="mt-3 flex items-center justify-between text-sm"><span className="rounded bg-orange-50 px-2 py-1 text-[#f97316]">{status}</span><span className="text-slate-500">{note}</span></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
