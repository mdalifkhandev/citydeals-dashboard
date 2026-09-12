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
  views: number;
  likes: number;
  redemptions: number;
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
    views: 1280,
    likes: 214,
    redemptions: 86,
  },
  {
    id: "2",
    offer: "Buy one, get one free",
    business: "Midtown East Suites",
    badge: "Cafe",
    startDate: "5 Aug 2026",
    endDate: "11 Sep 2026",
    status: "Published",
    views: 980,
    likes: 176,
    redemptions: 64,
  },
  {
    id: "3",
    offer: "20% off all brunch items",
    business: "Central Perk",
    badge: "Dining",
    startDate: "10 Aug 2026",
    endDate: "15 Sep 2026",
    status: "Published",
    views: 740,
    likes: 121,
    redemptions: 52,
  },
  {
    id: "4",
    offer: "Free dessert with any entree",
    business: "Sunset Grill",
    badge: "Dining",
    startDate: "12 Aug 2026",
    endDate: "20 Sep 2026",
    status: "Published",
    views: 618,
    likes: 89,
    redemptions: 37,
  },
  {
    id: "5",
    offer: "15% off all coffee orders",
    business: "Brew Lab",
    badge: "Cafe",
    startDate: "8 Aug 2026",
    endDate: "30 Sep 2026",
    status: "Published",
    views: 531,
    likes: 77,
    redemptions: 29,
  },
  {
    id: "6",
    offer: "Free appetizer with two entrees",
    business: "The Green Fork",
    badge: "Dining",
    startDate: "14 Aug 2026",
    endDate: "25 Sep 2026",
    status: "Published",
    views: 812,
    likes: 134,
    redemptions: 48,
  },
  {
    id: "7",
    offer: "$5 off any smoothie",
    business: "Tropical Treats",
    badge: "Cafe",
    startDate: "11 Aug 2026",
    endDate: "18 Sep 2026",
    status: "Published",
    views: 455,
    likes: 61,
    redemptions: 22,
  },
  {
    id: "8",
    offer: "Free side with any burger purchase",
    business: "Burger Hub",
    badge: "Dining",
    startDate: "13 Aug 2026",
    endDate: "22 Sep 2026",
    status: "Published",
    views: 389,
    likes: 44,
    redemptions: 18,
  },
  {
    id: "9",
    offer: "25% off all pastries",
    business: "Sweet Tooth Bakery",
    badge: "Cafe",
    startDate: "15 Aug 2026",
    endDate: "30 Sep 2026",
    status: "Published",
    views: 701,
    likes: 98,
    redemptions: 41,
  },
  {
    id: "10",
    offer: "Free coffee refill with any purchase",
    business: "Morning Brew",
    badge: "Cafe",
    startDate: "10 Aug 2026",
    endDate: "15 Sep 2026",
    status: "Published",
    views: 624,
    likes: 81,
    redemptions: 33,
  },
  {
    id: "11",
    offer: "10% off catering orders over $100",
    business: "Feast Catering",
    badge: "Dining",
    startDate: "16 Aug 2026",
    endDate: "30 Sep 2026",
    status: "Published",
    views: 512,
    likes: 57,
    redemptions: 16,
  },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [merchantFilter, setMerchantFilter] = useState("All merchants");
  const [statusFilter, setStatusFilter] = useState("All statuses");

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

  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  }

  function handleOpenNewCoupon() {
    setEditingCoupon(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingCoupon(null);
  }

  function handleEditCoupon(coupon: Coupon) {
    setOpenActionId(null);
    setEditingCoupon(coupon);
    setOffer(coupon.offer);
    setBusiness(coupon.business);
    setCategory(coupon.badge);
    setExpires("");
    setCouponCode("");
    setRedemptionLimit("");
    setDiscussion("");
    setTerms("");
    setIsModalOpen(true);
  }

  function handleToggleStatus(id: string) {
    setOpenActionId(null);
    setCoupons((currentCoupons) =>
      currentCoupons.map((coupon) =>
        coupon.id === id
          ? {
              ...coupon,
              status: coupon.status === "Published" ? "Draft" : "Published",
            }
          : coupon
      )
    );

    const coupon = coupons.find((item) => item.id === id);
    if (coupon) {
      showToast(
        `${coupon.offer} ${coupon.status === "Published" ? "unpublished" : "published"}`
      );
    }
  }

  function handleDeleteCoupon(id: string) {
    setOpenActionId(null);
    const coupon = coupons.find((item) => item.id === id);
    setCoupons((currentCoupons) => currentCoupons.filter((item) => item.id !== id));

    if (coupon) {
      showToast(`Deleted ${coupon.offer}`);
    }
  }

  function handleExport(format: "CSV" | "Excel" | "PDF") {
    showToast(`${format} export prepared for current coupon report`);
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

    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === editingCoupon.id
            ? {
                ...coupon,
                offer: offer.trim(),
                business: business.trim() || coupon.business,
                badge: (category as Coupon["badge"]) || coupon.badge,
                endDate: formatDate(expires),
              }
            : coupon
        )
      );
      handleCloseModal();
      showToast("Coupon changes saved");
      return;
    }

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
      views: 0,
      likes: 0,
      redemptions: 0,
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    handleCloseModal();
    showToast("Coupon saved");

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

  const merchantOptions = [
    "All merchants",
    ...Array.from(new Set(coupons.map((coupon) => coupon.business))),
  ];

  const filteredCoupons = coupons.filter((coupon) => {
    const merchantMatches =
      merchantFilter === "All merchants" || coupon.business === merchantFilter;
    const statusMatches = statusFilter === "All statuses" || coupon.status === statusFilter;
    return merchantMatches && statusMatches;
  });

  const totalViews = filteredCoupons.reduce((sum, coupon) => sum + coupon.views, 0);
  const totalLikes = filteredCoupons.reduce((sum, coupon) => sum + coupon.likes, 0);
  const totalRedemptions = filteredCoupons.reduce((sum, coupon) => sum + coupon.redemptions, 0);

  return (
    <div className="w-full px-8 py-6">
          <section className="w-full rounded-2xl border border-[#d1d5db] bg-white p-3">
            <div className="flex h-12 items-center justify-between gap-5">
              <div className="min-w-0">
                <h1 className="m-0 text-base font-normal leading-6 text-slate-900">
                  Coupons
                </h1>
                <p className="mt-1 truncate text-sm leading-5 text-[#475569]">
                  Manage all coupon offers, publishing status and redemption windows
                </p>
              </div>
              <button
                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-4 py-3 text-base leading-6 text-white transition-opacity hover:opacity-95"
                type="button"
                onClick={handleOpenNewCoupon}
              >
                <Image src={`${assetBase}imgAdd.svg`} alt="" width={24} height={24} />
                New coupon
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                { label: "Total opens / views", value: totalViews.toLocaleString() },
                { label: "Total likes", value: totalLikes.toLocaleString() },
                { label: "Total redemptions", value: totalRedemptions.toLocaleString() },
              ].map((item) => (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={item.label}>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {item.label}
                  </p>
                  <strong className="mt-1 block text-2xl font-semibold text-slate-900">
                    {item.value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex flex-wrap gap-3">
                <label className="grid gap-1">
                  <span className="text-xs font-medium text-slate-600">Merchant</span>
                  <select
                    className="h-10 min-w-48 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-orange-400"
                    value={merchantFilter}
                    onChange={(event) => setMerchantFilter(event.target.value)}
                  >
                    {merchantOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1">
                  <span className="text-xs font-medium text-slate-600">Status</span>
                  <select
                    className="h-10 min-w-40 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-orange-400"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    {["All statuses", "Published", "Draft", "Expired"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex gap-2">
                {(["CSV", "Excel", "PDF"] as const).map((format) => (
                  <button
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    key={format}
                    type="button"
                    onClick={() => handleExport(format)}
                  >
                    Export {format}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 overflow-x-auto overflow-y-visible rounded-lg border border-slate-200">
              <div className="min-w-[1120px]">
                {/* Table Header */}
                <div className="grid h-[55px] grid-cols-[minmax(250px,1.5fr)_minmax(170px,1fr)_110px_140px_90px_80px_110px_120px_70px] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
                  <div className="border-r border-slate-300 px-4">Offer</div>
                  <div className="border-r border-slate-300 px-4">Business</div>
                  <div className="border-r border-slate-300 px-4">Badge</div>
                  <div className="border-r border-slate-300 px-4">Rounds</div>
                  <div className="border-r border-slate-300 px-4">Views</div>
                  <div className="border-r border-slate-300 px-4">Likes</div>
                  <div className="border-r border-slate-300 px-4">Redemptions</div>
                  <div className="border-r border-slate-300 px-4">Status</div>
                  <div className="px-4 text-center">Actions</div>
                </div>

                {/* Table Body */}
                {filteredCoupons.map((coupon) => (
                  <div
                    className="grid h-[60px] grid-cols-[minmax(250px,1.5fr)_minmax(170px,1fr)_110px_140px_90px_80px_110px_120px_70px] items-center border-b border-dashed border-slate-200 bg-white transition-colors hover:bg-slate-50/70 last:border-b-0"
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

                    <p className="px-4 text-sm text-slate-900">{coupon.views.toLocaleString()}</p>
                    <p className="px-4 text-sm text-slate-900">{coupon.likes.toLocaleString()}</p>
                    <p className="px-4 text-sm text-slate-900">{coupon.redemptions.toLocaleString()}</p>

                    {/* Status column */}
                    <div className="px-4">
                      <span
                        className={
                          coupon.status === "Published"
                            ? "inline-flex h-6 items-center rounded bg-emerald-100 px-2.5 text-xs font-medium leading-5 text-[#16a34a]"
                            : coupon.status === "Expired"
                              ? "inline-flex h-6 items-center rounded bg-red-100 px-2.5 text-xs font-medium leading-5 text-red-600"
                              : "inline-flex h-6 items-center rounded bg-slate-100 px-2.5 text-xs font-medium leading-5 text-slate-600"
                        }
                      >
                        {coupon.status}
                      </span>
                    </div>

                    {/* Actions column */}
                    <div className="relative flex justify-center px-4">
                      <button
                        type="button"
                        aria-expanded={openActionId === coupon.id}
                        aria-label={`Open actions for ${coupon.offer}`}
                        className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-lg font-bold leading-none text-[#0c4a6e] shadow-sm transition-colors hover:border-[#0c4a6e] hover:bg-sky-50"
                        onClick={() =>
                          setOpenActionId((currentId) =>
                            currentId === coupon.id ? null : coupon.id
                          )
                        }
                      >
                        ⋮
                      </button>
                      {openActionId === coupon.id && (
                        <div className="absolute right-4 top-10 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl">
                          <button
                            className="block w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50"
                            type="button"
                            onClick={() => handleEditCoupon(coupon)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full px-3.5 py-2 text-left text-[#f97316] hover:bg-orange-50"
                            type="button"
                            onClick={() => handleToggleStatus(coupon.id)}
                          >
                            {coupon.status === "Published" ? "Unpublish" : "Publish"}
                          </button>
                          <button
                            className="block w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50"
                            type="button"
                            onClick={() => handleDeleteCoupon(coupon.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

      {/* Reusable Centered Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCoupon ? "Edit coupon" : "New coupon"}
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
              onClick={handleCloseModal}
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 flex-1 rounded-xl bg-[#f97316] text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
            >
              {editingCoupon ? "Save changes" : "Save coupon"}
            </button>
          </div>
        </form>
      </Modal>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
