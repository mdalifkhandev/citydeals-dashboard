const pages = [
  ["Terms of Use", "terms-of-use", "1.0", "Published"],
  ["Privacy Policy", "privacy-policy", "1.0", "Draft"],
  ["Coupon Rules", "coupon-rules", "1.0", "Published"],
];

export default function LegalPagesPage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Legal Pages</h1>
            <p className="mt-1 text-sm text-slate-500">Manage mobile app Terms of Use and related legal content.</p>
          </div>
          <button className="h-11 rounded-xl bg-[#f97316] px-4 text-sm font-medium text-white">Save content</button>
        </div>
        <div className="mt-5 grid grid-cols-[320px_minmax(0,1fr)] gap-5">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            {pages.map(([title, slug, version, status]) => (
              <button className="grid w-full grid-cols-[1fr_70px] border-b border-slate-100 px-4 py-3 text-left text-sm last:border-b-0" key={slug}>
                <span><strong>{title}</strong><small className="block text-slate-500">{slug} · v{version}</small></span>
                <span className="text-slate-500">{status}</span>
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <label className="grid gap-1 text-sm"><span>Title</span><input className="h-10 rounded-lg border border-slate-200 px-3" defaultValue="Terms of Use" /></label>
            <label className="mt-3 grid gap-1 text-sm"><span>Content</span><textarea className="min-h-72 rounded-lg border border-slate-200 px-3 py-2" defaultValue="Please read these terms and conditions carefully before using the CityDeals application." /></label>
          </div>
        </div>
      </section>
    </div>
  );
}
