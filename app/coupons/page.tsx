"use client";

import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import Modal from "@/components/Modal";

const assetBase = "/assets/dashboard/";

interface Coupon {
  id: string;
  offer: string;
  business: string;
  badge: "Dining" | "Cafe" | "Retail" | "Entertainment";
  startDate: string;
  endDate: string;
  status: "Published" | "Draft" | "Expired";
}

const initialCoupons: Coupon[] = [
  {
    id: "1",
    offer: "$10 off orders over $50",
    business: "Midtown East Suites",
    badge: "Dining",
    startDate: "5 Aug 2026",
    endDate: "11 Sep 2026",
    status: "Published",
  },
  {
    id: "2",
    offer: "Buy one, get one free",
    business: "Midtown East Suites",
    badge: "Cafe",
    startDate: "5 Aug 2026",
    endDate: "11 Sep 2026",
    status: "Published",
  },
  {
    id: "3",
    offer: "20% off all brunch items",
    business: "Central Perk",
    badge: "Dining",
    startDate: "10 Aug 2026",
    endDate: "15 Sep 2026",
    status: "Published",
  },
  {
    id: "4",
    offer: "Free dessert with any entree",
    business: "Sunset Grill",
    badge: "Dining",
    startDate: "12 Aug 2026",
    endDate: "20 Sep 2026",
    status: "Published",
  },
  {
    id: "5",
    offer: "15% off all coffee orders",
    business: "Brew Lab",
    badge: "Cafe",
    startDate: "8 Aug 2026",
    endDate: "30 Sep 2026",
    status: "Published",
  },
  {
    id: "6",
    offer: "Free appetizer with two entrees",
    business: "The Green Fork",
    badge: "Dining",
    startDate: "14 Aug 2026",
    endDate: "25 Sep 2026",
    status: "Published",
  },
  {
    id: "7",
    offer: "$5 off any smoothie",
    business: "Tropical Treats",
    badge: "Cafe",
    startDate: "11 Aug 2026",
    endDate: "18 Sep 2026",
    status: "Published",
  },
  {
    id: "8",
    offer: "Free side with any burger purchase",
    business: "Burger Hub",
    badge: "Dining",
    startDate: "13 Aug 2026",
    endDate: "22 Sep 2026",
    status: "Published",
  },
  {
    id: "9",
    offer: "25% off all pastries",
    business: "Sweet Tooth Bakery",
    badge: "Cafe",
    startDate: "15 Aug 2026",
    endDate: "30 Sep 2026",
    status: "Published",
  },
  {
    id: "10",
    offer: "Free coffee refill with any purchase",
    business: "Morning Brew",
    badge: "Cafe",
    startDate: "10 Aug 2026",
    endDate: "15 Sep 2026",
    status: "Published",
  },
  {
    id: "11",
    offer: "10% off catering orders over $100",
    business: "Feast Catering",
    badge: "Dining",
    startDate: "16 Aug 2026",
    endDate: "30 Sep 2026",
    status: "Published",
  },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Form states
  const [offer, setOffer] = useState("");
  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [redemptionLimit, setRedemptionLimit] = useState("");
  const [expires, setExpires] = useState("");
  const [frequency, setFrequency] = useState("One-time use");
  const [discussion, setDiscussion] = useState("");
  const [terms, setTerms] = useState("");

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextPreview = URL.createObjectURL(file);
    setLogoPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }
      return nextPreview;
    });
  }

  function formatDate(date: string) {
    if (!date) return "30 Sep 2026";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offer.trim()) return;

    const newCoupon: Coupon = {
      id: Date.now().toString(),
      offer: offer.trim(),
      business: business.trim() || "Midtown East Suites",
      badge: (category as "Dining" | "Cafe") || "Dining",
      startDate: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      endDate: formatDate(expires),
      status: "Published",
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    setIsModalOpen(false);

    // Reset fields
    setOffer("");
    setBusiness("");
    setCategory("");
    setCouponCode("");
    setRedemptionLimit("");
    setExpires("");
    setDiscussion("");
    setTerms("");
  };

  return (
    <div className="w-full px-8 py-6">
          <section className="w-full rounded-2xl border border-[#d1d5db] bg-white p-3">
            <div className="flex h-12 items-center justify-between gap-5">
              <div className="min-w-0">
                <h1 className="m-0 text-base font-normal leading-6 text-slate-900">
                  Businesses
                </h1>
                <p className="mt-1 truncate text-sm leading-5 text-[#475569]">
                  Manage all your businesses
                </p>
              </div>
              <button
                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-4 py-3 text-base leading-6 text-white transition-opacity hover:opacity-95"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                <Image src={`${assetBase}imgAdd.svg`} alt="" width={24} height={24} />
                New coupon
              </button>
            </div>

            <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
              <div className="min-w-[900px]">
                {/* Table Header */}
                <div className="grid h-[55px] grid-cols-[minmax(280px,1.6fr)_minmax(180px,1.1fr)_120px_160px_130px_70px] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
                  <div className="border-r border-slate-300 px-4">Offer</div>
                  <div className="border-r border-slate-300 px-4">Business</div>
                  <div className="border-r border-slate-300 px-4">Badge</div>
                  <div className="border-r border-slate-300 px-4">Rounds</div>
                  <div className="border-r border-slate-300 px-4">Status</div>
                  <div className="px-4 text-center">Actions</div>
                </div>

                {/* Table Body */}
                {coupons.map((coupon) => (
                  <div
                    className="grid h-[60px] grid-cols-[minmax(280px,1.6fr)_minmax(180px,1.1fr)_120px_160px_130px_70px] items-center border-b border-dashed border-slate-200 bg-white transition-colors hover:bg-slate-50/70 last:border-b-0"
                    key={coupon.id}
                  >
                    {/* Offer column */}
                    <div className="flex min-w-0 items-center gap-3 px-4 py-2">
                      <span className="relative size-8 shrink-0 overflow-hidden rounded">
                        <Image
                          className="scale-150 object-cover"
                          src={`${assetBase}imgLocationAvatar.png`}
                          alt=""
                          fill
                          sizes="32px"
                        />
                      </span>
                      <strong className="block truncate text-sm font-normal leading-5 text-slate-900">
                        {coupon.offer}
                      </strong>
                    </div>

                    {/* Business column */}
                    <p className="truncate px-4 text-sm leading-5 text-slate-900">
                      {coupon.business}
                    </p>

                    {/* Badge column */}
                    <div className="px-4">
                      <span className="inline-flex h-6 items-center rounded bg-[#ffedd5] px-2.5 text-xs font-medium text-[#f97316]">
                        {coupon.badge}
                      </span>
                    </div>

                    {/* Rounds column */}
                    <div className="px-4 leading-tight">
                      <p className="m-0 text-sm font-normal leading-5 text-slate-900">
                        {coupon.startDate}
                      </p>
                      <p className="m-0 text-xs leading-4 text-[#475569]">
                        Exp-{coupon.endDate}
                      </p>
                    </div>

                    {/* Status column */}
                    <div className="px-4">
                      <span className="inline-flex h-6 items-center rounded bg-emerald-100 px-2.5 text-xs font-medium leading-5 text-[#16a34a]">
                        {coupon.status}
                      </span>
                    </div>

                    {/* Actions column */}
                    <div className="flex justify-center px-4">
                      <button
                        type="button"
                        aria-label="Actions"
                        className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      >
                        <svg
                          className="size-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="10" cy="4" r="1.5" />
                          <circle cx="10" cy="10" r="1.5" />
                          <circle cx="10" cy="16" r="1.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

      {/* Reusable Centered Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New coupon"
        maxWidth="max-w-[560px]"
      >
        <form onSubmit={handleSaveCoupon} className="flex flex-col gap-4">
          {/* Top Logo Upload Card */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-3.5">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-slate-200">
              <Image
                src={logoPreview ?? `${assetBase}imgLocationAvatar.png`}
                alt="Upload preview"
                fill
                sizes="64px"
                className="scale-125 object-cover"
                unoptimized={!!logoPreview}
              />
            </span>
            <label
              className="flex h-10 cursor-pointer items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
              htmlFor="coupon-logo-upload"
            >
              Upload Logo
              <input
                className="sr-only"
                id="coupon-logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </label>
          </div>

          {/* Form Fields Card */}
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4">
            {/* Row 1: Business & Offer Title */}
            <div className="grid grid-cols-2 gap-3.5">
              <label className="grid gap-1">
                <span className="text-xs font-semibold text-slate-800">Business</span>
                <div className="relative">
                  <select
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 pr-8 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400 focus:bg-white"
                  >
                    <option value="">Select Business</option>
                    <option value="Midtown East Suites">Midtown East Suites</option>
                    <option value="Central Perk">Central Perk</option>
                    <option value="Sunset Grill">Sunset Grill</option>
                    <option value="Brew Lab">Brew Lab</option>
                    <option value="The Green Fork">The Green Fork</option>
                    <option value="Tropical Treats">Tropical Treats</option>
                    <option value="Burger Hub">Burger Hub</option>
                    <option value="Sweet Tooth Bakery">Sweet Tooth Bakery</option>
                    <option value="Morning Brew">Morning Brew</option>
                    <option value="Feast Catering">Feast Catering</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-semibold text-slate-800">Offer Title *</span>
                <input
                  required
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  placeholder="Enter business name"
                  className="h-10 w-full rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400 focus:bg-white"
                />
              </label>
            </div>

            {/* Row 2: Categories & Coupon Code / link */}
            <div className="grid grid-cols-2 gap-3.5">
              <label className="grid gap-1">
                <span className="text-xs font-semibold text-slate-800">Categories</span>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 pr-8 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400 focus:bg-white"
                  >
                    <option value="">Select category.</option>
                    <option value="Dining">Dining</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Retail">Retail</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-semibold text-slate-800">Coupon Code / link</span>
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="---"
                  className="h-10 w-full rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400 focus:bg-white"
                />
              </label>
            </div>

            {/* Row 3: Redemption Limit & Expires */}
            <div className="grid grid-cols-2 gap-3.5">
              <label className="grid gap-1">
                <span className="text-xs font-semibold text-slate-800">Redemption Limit</span>
                <input
                  value={redemptionLimit}
                  onChange={(e) => setRedemptionLimit(e.target.value)}
                  placeholder="e.g. 50"
                  className="h-10 w-full rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400 focus:bg-white"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-semibold text-slate-800">Expires</span>
                <div className="relative">
                  <input
                    type="date"
                    value={expires}
                    onChange={(e) => setExpires(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400 focus:bg-white"
                  />
                </div>
              </label>
            </div>

            {/* Row 4: Redemption Frequency* */}
            <label className="grid gap-1">
              <span className="text-xs font-semibold text-slate-800">Redemption Frequency*</span>
              <div className="relative">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="h-10 w-full appearance-none rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 pr-8 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400 focus:bg-white"
                >
                  <option value="One-time use">One-time use</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Unlimited">Unlimited</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </label>

            {/* Row 5: Discussion */}
            <label className="grid gap-1">
              <span className="text-xs font-semibold text-slate-800">Discussion</span>
              <input
                value={discussion}
                onChange={(e) => setDiscussion(e.target.value)}
                placeholder="Add a short caption (optional)"
                className="h-10 w-full rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400 focus:bg-white"
              />
            </label>

            {/* Row 6: Terms and conditions */}
            <label className="grid gap-1">
              <span className="text-xs font-semibold text-slate-800">Terms and conditions</span>
              <input
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="Add a short caption (optional)"
                className="h-10 w-full rounded-xl border border-slate-200/70 bg-[#f8fafc] px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400 focus:bg-white"
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 flex-1 rounded-xl bg-[#f97316] text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
            >
              Save coupon
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
