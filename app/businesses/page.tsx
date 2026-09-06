"use client";

import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import Modal from "@/components/Modal";

const assetBase = "/assets/dashboard/";

const locations = [
  {
    name: "Financial District Plaza",
    slug: "financial-district-plaza",
    address: "55 Water St, New York, NY 10004, USA",
    category: "Dining",
    radius: "3.0 km",
    phone: "151-111-9991",
    email: "example@gmail.com",
  },
  {
    name: "Midtown East Suites",
    slug: "midtown-east-suites",
    address: "600 Lexington Ave, New York, NY 10022, USA",
    category: "Cafe",
    radius: "1.1 km",
    phone: "151-111-9991",
    email: "example@gmail.com",
  },
  {
    name: "SoHo Art Gallery",
    slug: "soho-art-gallery",
    address: "131 Grand St, New York, NY 10013, USA",
    category: "Gallery",
    radius: "2.5 km",
    phone: "151-222-8888",
    email: "contact@sohoart.com",
  },
  {
    name: "Battery Park Fitness",
    slug: "battery-park-fitness",
    address: "75 Battery Pl, New York, NY 10280, USA",
    category: "Gym",
    radius: "4.2 km",
    phone: "151-333-7777",
    email: "info@batteryfit.com",
  },
  {
    name: "Chelsea Market",
    slug: "chelsea-market",
    address: "75 9th Ave, New York, NY 10011, USA",
    category: "Marketplace",
    radius: "3.8 km",
    phone: "151-444-6666",
    email: "contact@chelseamarket.com",
  },
  {
    name: "Upper East Side Books",
    slug: "upper-east-side-books",
    address: "123 Lexington Ave, New York, NY 10075, USA",
    category: "Bookstore",
    radius: "1.9 km",
    phone: "151-555-5555",
    email: "info@uesbooks.com",
  },
  {
    name: "Greenwich Village Theater",
    slug: "greenwich-village-theater",
    address: "50 W 13th St, New York, NY 10011, USA",
    category: "Theater",
    radius: "2.7 km",
    phone: "151-666-4444",
    email: "bookings@gvtheater.com",
  },
  {
    name: "East Village Music Hall",
    slug: "east-village-music-hall",
    address: "95 2nd Ave, New York, NY 10003, USA",
    category: "Bookstore",
    radius: "2.3 km",
    phone: "151-777-3333",
    email: "contact@evmusichall.com",
  },
  {
    name: "Tribeca Tech Hub",
    slug: "tribeca-tech-hub",
    address: "200 Hudson St, New York, NY 10013, USA",
    category: "Bookstore",
    radius: "3.1 km",
    phone: "151-888-2222",
    email: "hello@tribecatech.com",
  },
  {
    name: "Harlem Jazz Cafe",
    slug: "harlem-jazz-cafe",
    address: "230 W 125th St, New York, NY 10027, USA",
    category: "Cafe",
    radius: "5.5 km",
    phone: "151-999-1111",
    email: "info@harlemjazzcafe.com",
  },
];

const fields = [
  { label: "Name", placeholder: "Enter business name", span: "md:col-span-6" },
  { label: "Title text", placeholder: "Label", span: "md:col-span-6" },
  { label: "Category", placeholder: "Select category", span: "md:col-span-12", select: true },
];

export default function BusinessesPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

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

  return (
    <div className="w-full p-8">
          <section className="rounded-2xl border border-[#d1d5db] bg-white p-3">
            <div className="flex h-12 items-center justify-between">
              <div className="min-w-0">
                <h1 className="m-0 text-base font-normal leading-6 text-slate-900">Businesses</h1>
                <p className="mt-1 text-sm leading-5 text-[#475569]">Manage all your businesses</p>
              </div>
              <button
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-3 py-3 text-base leading-6 text-white"
                type="button"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Image src={`${assetBase}imgAdd.svg`} alt="" width={24} height={24} />
                Add New location
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <div className="grid h-[55px] grid-cols-[minmax(220px,1.4fr)_minmax(170px,1fr)_140px_100px_189px_110px_72px] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
                {["Location name", "Location", "Category", "Radius", "Contact", "Status", "Actions"].map(
                  (heading) => (
                    <div className="border-r border-slate-300 px-3 last:border-r-0" key={heading}>
                      {heading}
                    </div>
                  ),
                )}
              </div>

              {locations.map((location) => (
                <div
                  className="grid h-[52px] grid-cols-[minmax(220px,1.4fr)_minmax(170px,1fr)_140px_100px_189px_110px_72px] items-center border-b border-dashed border-slate-200 bg-white last:border-b-0"
                  key={location.slug}
                >
                  <div className="flex min-w-0 items-center gap-3 px-3 py-2">
                    <span className="relative size-8 shrink-0 overflow-hidden rounded">
                      <Image
                        className="scale-150 object-cover"
                        src={`${assetBase}imgLocationAvatar.png`}
                        alt=""
                        fill
                        sizes="32px"
                      />
                    </span>
                    <span className="min-w-0">
                      <strong className="block truncate text-sm font-normal leading-5 text-slate-900">
                        {location.name}
                      </strong>
                      <small className="block truncate text-xs leading-4 text-[#475569]">
                        {location.slug}
                      </small>
                    </span>
                  </div>
                  <p className="truncate px-3 text-sm leading-5 text-slate-900">{location.address}</p>
                  <div className="px-3">
                    <span className="inline-flex h-6 items-center rounded bg-orange-50 px-2 text-sm leading-5 text-[#f97316]">
                      {location.category}
                    </span>
                  </div>
                  <p className="px-3 text-sm leading-5 text-slate-900">{location.radius}</p>
                  <div className="min-w-0 px-3">
                    <strong className="block truncate text-sm font-normal leading-5 text-slate-900">
                      {location.phone}
                    </strong>
                    <small className="block truncate text-xs leading-4 text-[#475569]">
                      {location.email}
                    </small>
                  </div>
                  <div className="px-3">
                    <span className="inline-flex h-6 items-center rounded bg-emerald-100 px-2 text-sm leading-5 text-[#16a34a]">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-center px-3 text-2xl leading-none text-[#315576]">
                    ...
                  </div>
                </div>
              ))}
            </div>
          </section>

      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add New Business"
        subtitle="Enter business"
        maxWidth="max-w-[620px]"
      >
        <form className="flex flex-col gap-3">
          <div className="flex w-full items-center gap-6 rounded-3xl border border-[#e5e7eb] bg-gray-100 p-3.5">
            <Image
              className="size-[76px] rounded-2xl border-2 border-[#d1d5db] object-cover"
              src={logoPreview ?? `${assetBase}imgBusinessLogo.png`}
              alt=""
              width={76}
              height={76}
              unoptimized={!!logoPreview}
            />
            <label
              className="flex h-12 cursor-pointer items-center rounded-lg border border-[#e5e7eb] bg-gray-50 px-3.5 py-3 text-base font-medium leading-6 text-gray-900 shadow-md hover:bg-white"
              htmlFor="business-logo-upload"
            >
              Upload Logo
              <input
                className="sr-only"
                id="business-logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </label>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-3.5">
            <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 md:grid-cols-12">
              {fields.map((field) => (
                <label
                  className={`grid min-w-0 gap-1 ${field.span}`}
                  key={field.label}
                >
                  <span className="text-sm leading-5 text-slate-900">{field.label}</span>
                  <span className="flex h-[42px] min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm leading-[22px] tracking-[0.22px] text-[#475569]">
                    <input
                      className="w-full min-w-0 flex-1 truncate bg-transparent outline-none placeholder:text-[#475569]"
                      placeholder={field.placeholder}
                    />
                    {field.select && (
                      <Image src={`${assetBase}imgArrowDown.svg`} alt="" width={24} height={24} />
                    )}
                  </span>
                </label>
              ))}
              <label className="grid min-w-0 gap-1 md:col-span-12">
                <span className="text-sm leading-5 text-slate-900">Address</span>
                <span className="flex h-[42px] min-w-0 items-center rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm leading-[22px] tracking-[0.22px] text-[#475569]">
                  <input
                    className="w-full min-w-0 flex-1 truncate bg-transparent outline-none placeholder:text-[#475569]"
                    placeholder="Search address: (e.g. 1560, New York, NY)"
                  />
                </span>
              </label>

              <div className="grid min-w-0 gap-3.5 md:col-span-6">
                <Field label="Website" placeholder="www.example.com" />
                <Field label="Instagram" placeholder="instagram.com/username" />
              </div>

              <div className="grid min-w-0 gap-3.5 md:col-span-6">
                <Field label="Facebook" placeholder="facebook.com/username" />
                <Field label="TikTok" placeholder="tiktok.com/@username" />
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3 pt-1">
            <button
              className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base leading-6 text-slate-900 hover:bg-slate-100"
              type="button"
              onClick={() => setIsDrawerOpen(false)}
            >
              Cancel
            </button>
            <button
              className="h-12 flex-1 rounded-xl bg-[#f97316] px-3 py-3 text-base leading-6 text-white hover:opacity-95"
              type="submit"
            >
              Save Business
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function Field({
  label,
  placeholder,
  className = "",
}: {
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <label className={`grid min-w-0 gap-1 ${className}`}>
      <span className="text-sm leading-5 text-slate-900">{label}</span>
      <span className="flex h-[42px] min-w-0 items-center rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm leading-[22px] tracking-[0.22px] text-[#475569]">
        <input
          className="w-full min-w-0 flex-1 truncate bg-transparent outline-none placeholder:text-[#475569]"
          placeholder={placeholder}
        />
      </span>
    </label>
  );
}
