const slides = [
  ["Special Discounts", "Save More on What You Love", "Discover local deals, exclusive coupons and special offers near you."],
  ["Nearby Locations", "Find Great Deals Near You", "Browse nearby coupon locations, restaurants and offers around your area."],
  ["Instant Checkout", "Ready to Save Every Day", "Save favorite coupons and show them at checkout anytime."],
];

export default function OnboardingContentPage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Onboarding Content</h1>
            <p className="mt-1 text-sm text-slate-500">Edit the mobile app onboarding slides shown before account creation.</p>
          </div>
          <button className="h-11 rounded-xl bg-[#f97316] px-4 text-sm font-medium text-white">Save slides</button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {slides.map(([badge, title, description], index) => (
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={title}>
              <div className="mb-4 flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-500">Slide image {index + 1}</div>
              <label className="grid gap-1 text-sm"><span>Badge</span><input className="h-10 rounded-lg border border-slate-200 px-3" defaultValue={badge} /></label>
              <label className="mt-3 grid gap-1 text-sm"><span>Title</span><input className="h-10 rounded-lg border border-slate-200 px-3" defaultValue={title} /></label>
              <label className="mt-3 grid gap-1 text-sm"><span>Description</span><textarea className="min-h-20 rounded-lg border border-slate-200 px-3 py-2" defaultValue={description} /></label>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
