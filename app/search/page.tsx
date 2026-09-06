import Image from "next/image";

const assetBase = "/assets/dashboard/";

const quickResults = [
  ["Financial District Plaza", "Business", "55 Water St, New York"],
  ["Weekend BOGO", "Coupon", "55 live redemptions"],
  ["Dining", "Category", "86 businesses linked"],
  ["Jack Will", "User", "jack.will95@gmail.com"],
];

export default function SearchPage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="w-full rounded-2xl border border-[#d1d5db] bg-white p-3">
        <div className="px-3 pt-1">
          <h1 className="m-0 text-2xl font-semibold leading-8 text-slate-900">Search</h1>
          <p className="mt-1 text-sm leading-5 text-[#475569]">
            Search businesses, coupons, categories and users.
          </p>
        </div>

        <div className="mt-4 flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-4">
          <Image src={`${assetBase}imgSearchNormal.svg`} alt="" width={22} height={22} />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="Search anything..."
          />
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
          <div className="grid h-[55px] grid-cols-[minmax(260px,1.2fr)_160px_minmax(280px,1.5fr)] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
            <div className="border-r border-slate-300 px-3">Name</div>
            <div className="border-r border-slate-300 px-3">Type</div>
            <div className="px-3">Details</div>
          </div>
          {quickResults.map(([name, type, detail]) => (
            <div
              className="grid h-[52px] grid-cols-[minmax(260px,1.2fr)_160px_minmax(280px,1.5fr)] items-center border-b border-dashed border-slate-200 last:border-b-0"
              key={name}
            >
              <p className="truncate px-3 text-sm leading-5 text-slate-900">{name}</p>
              <p className="px-3 text-sm leading-5 text-[#475569]">{type}</p>
              <p className="truncate px-3 text-sm leading-5 text-slate-900">{detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
