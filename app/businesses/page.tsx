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
    status: "Active",
  },
  {
    name: "Midtown East Suites",
    slug: "midtown-east-suites",
    address: "600 Lexington Ave, New York, NY 10022, USA",
    category: "Cafe",
    radius: "1.1 km",
    phone: "151-111-9991",
    email: "example@gmail.com",
    status: "Active",
  },
  {
    name: "SoHo Art Gallery",
    slug: "soho-art-gallery",
    address: "131 Grand St, New York, NY 10013, USA",
    category: "Gallery",
    radius: "2.5 km",
    phone: "151-222-8888",
    email: "contact@sohoart.com",
    status: "Draft",
  },
  {
    name: "Battery Park Fitness",
    slug: "battery-park-fitness",
    address: "75 Battery Pl, New York, NY 10280, USA",
    category: "Gym",
    radius: "4.2 km",
    phone: "151-333-7777",
    email: "info@batteryfit.com",
    status: "Active",
  },
  {
    name: "Chelsea Market",
    slug: "chelsea-market",
    address: "75 9th Ave, New York, NY 10011, USA",
    category: "Marketplace",
    radius: "3.8 km",
    phone: "151-444-6666",
    email: "contact@chelseamarket.com",
    status: "Active",
  },
  {
    name: "Upper East Side Books",
    slug: "upper-east-side-books",
    address: "123 Lexington Ave, New York, NY 10075, USA",
    category: "Bookstore",
    radius: "1.9 km",
    phone: "151-555-5555",
    email: "info@uesbooks.com",
    status: "Draft",
  },
  {
    name: "Greenwich Village Theater",
    slug: "greenwich-village-theater",
    address: "50 W 13th St, New York, NY 10011, USA",
    category: "Theater",
    radius: "2.7 km",
    phone: "151-666-4444",
    email: "bookings@gvtheater.com",
    status: "Active",
  },
  {
    name: "East Village Music Hall",
    slug: "east-village-music-hall",
    address: "95 2nd Ave, New York, NY 10003, USA",
    category: "Bookstore",
    radius: "2.3 km",
    phone: "151-777-3333",
    email: "contact@evmusichall.com",
    status: "Active",
  },
  {
    name: "Tribeca Tech Hub",
    slug: "tribeca-tech-hub",
    address: "200 Hudson St, New York, NY 10013, USA",
    category: "Bookstore",
    radius: "3.1 km",
    phone: "151-888-2222",
    email: "hello@tribecatech.com",
    status: "Draft",
  },
  {
    name: "Harlem Jazz Cafe",
    slug: "harlem-jazz-cafe",
    address: "230 W 125th St, New York, NY 10027, USA",
    category: "Cafe",
    radius: "5.5 km",
    phone: "151-999-1111",
    email: "info@harlemjazzcafe.com",
    status: "Active",
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
  const [businessList, setBusinessList] = useState(locations);
  const [editingBusiness, setEditingBusiness] = useState<(typeof locations)[number] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openActionSlug, setOpenActionSlug] = useState<string | null>(null);

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

  function handleEditBusiness(location: (typeof locations)[number]) {
    setOpenActionSlug(null);
    setEditingBusiness(location);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setEditingBusiness(null);
  }

  function handleToggleStatus(slug: string) {
    setOpenActionSlug(null);
    setBusinessList((currentList) =>
      currentList.map((location) =>
        location.slug === slug
          ? { ...location, status: location.status === "Active" ? "Draft" : "Active" }
          : location
      )
    );

    const location = businessList.find((item) => item.slug === slug);
    if (location) {
      showToast(
        `${location.name} ${location.status === "Active" ? "unpublished" : "published"}`
      );
    }
  }

  function handleDeleteBusiness(slug: string) {
    setOpenActionSlug(null);
    const location = businessList.find((item) => item.slug === slug);
    setBusinessList((currentList) => currentList.filter((item) => item.slug !== slug));

    if (location) {
      showToast(`Deleted ${location.name}`);
    }
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
          <section className="rounded-2xl border border-[#d1d5db] bg-white p-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h1 className="m-0 text-base font-normal leading-6 text-slate-900">Businesses</h1>
                <p className="mt-1 text-sm leading-5 text-[#475569]">Manage all your businesses</p>
              </div>
              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] px-3 py-3 text-base leading-6 text-white sm:w-auto"
                type="button"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Image src={`${assetBase}imgAdd.svg`} alt="" width={24} height={24} />
                Add New location
              </button>
            </div>

            <div className="mt-4 grid gap-3 lg:hidden">
              {businessList.map((location) => (
                <article className="rounded-2xl border border-slate-200 bg-white p-4" key={location.slug}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 gap-3">
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          className="scale-150 object-cover"
                          src={`${assetBase}imgLocationAvatar.png`}
                          alt=""
                          fill
                          sizes="40px"
                        />
                      </span>
                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-slate-900">
                          {location.name}
                        </h2>
                        <p className="truncate text-xs text-slate-500">{location.slug}</p>
                      </div>
                    </div>

                    <div className="relative shrink-0">
                      <button
                        aria-expanded={openActionSlug === location.slug}
                        aria-label={`Open actions for ${location.name}`}
                        className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-lg font-bold leading-none text-[#0c4a6e] shadow-sm transition-colors hover:border-[#0c4a6e] hover:bg-sky-50"
                        type="button"
                        onClick={() =>
                          setOpenActionSlug((currentSlug) =>
                            currentSlug === location.slug ? null : location.slug
                          )
                        }
                      >
                        ⋮
                      </button>
                      {openActionSlug === location.slug && (
                        <div className="absolute right-0 top-11 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl">
                          <button
                            className="block w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50"
                            type="button"
                            onClick={() => handleEditBusiness(location)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full px-3.5 py-2 text-left text-[#f97316] hover:bg-orange-50"
                            type="button"
                            onClick={() => handleToggleStatus(location.slug)}
                          >
                            {location.status === "Active" ? "Unpublish" : "Publish"}
                          </button>
                          <button
                            className="block w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50"
                            type="button"
                            onClick={() => handleDeleteBusiness(location.slug)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm">
                    <div>
                      <span className="block text-xs font-medium text-slate-500">Address</span>
                      <p className="mt-0.5 text-slate-900">{location.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <span className="block text-xs text-slate-500">Category</span>
                        <strong className="text-[#f97316]">{location.category}</strong>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <span className="block text-xs text-slate-500">Radius</span>
                        <strong className="text-slate-900">{location.radius}</strong>
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <span className="block text-xs text-slate-500">Contact</span>
                      <p className="mt-0.5 text-slate-900">{location.phone}</p>
                      <p className="break-all text-xs text-slate-500">{location.email}</p>
                    </div>
                    <span
                      className={
                        location.status === "Active"
                          ? "w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-[#16a34a]"
                          : "w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      }
                    >
                      {location.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 hidden overflow-visible rounded-lg border border-slate-200 lg:block">
              <div className="grid h-[55px] grid-cols-[minmax(220px,1.4fr)_minmax(170px,1fr)_140px_100px_189px_110px_90px] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
                {["Location name", "Location", "Category", "Radius", "Contact", "Status", "Actions"].map(
                  (heading) => (
                    <div className="border-r border-slate-300 px-3 last:border-r-0" key={heading}>
                      {heading}
                    </div>
                  ),
                )}
              </div>

              {businessList.map((location) => (
                <div
                  className="grid h-[52px] grid-cols-[minmax(220px,1.4fr)_minmax(170px,1fr)_140px_100px_189px_110px_90px] items-center border-b border-dashed border-slate-200 bg-white last:border-b-0"
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
                    <span
                      className={
                        location.status === "Active"
                          ? "inline-flex h-6 items-center rounded bg-emerald-100 px-2 text-sm leading-5 text-[#16a34a]"
                          : "inline-flex h-6 items-center rounded bg-slate-100 px-2 text-sm leading-5 text-slate-600"
                      }
                    >
                      {location.status}
                    </span>
                  </div>
                  <div className="relative flex items-center justify-center px-3">
                    <button
                      aria-expanded={openActionSlug === location.slug}
                      aria-label={`Open actions for ${location.name}`}
                      className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-lg font-bold leading-none text-[#0c4a6e] shadow-sm transition-colors hover:border-[#0c4a6e] hover:bg-sky-50"
                      type="button"
                      onClick={() =>
                        setOpenActionSlug((currentSlug) =>
                          currentSlug === location.slug ? null : location.slug
                        )
                      }
                    >
                      ⋮
                    </button>
                    {openActionSlug === location.slug && (
                      <div className="absolute right-3 top-10 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl">
                        <button
                          className="block w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50"
                          type="button"
                          onClick={() => handleEditBusiness(location)}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full px-3.5 py-2 text-left text-[#f97316] hover:bg-orange-50"
                          type="button"
                          onClick={() => handleToggleStatus(location.slug)}
                        >
                          {location.status === "Active" ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          className="block w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50"
                          type="button"
                          onClick={() => handleDeleteBusiness(location.slug)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

      <Modal
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title={editingBusiness ? "Edit Business" : "Add New Business"}
        subtitle={
          editingBusiness
            ? `Update ${editingBusiness.name}`
            : "Enter business"
        }
        maxWidth="max-w-[620px]"
      >
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            showToast(editingBusiness ? "Business changes saved" : "Business saved");
            handleCloseDrawer();
          }}
        >
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
              onClick={handleCloseDrawer}
            >
              Cancel
            </button>
            <button
              className="h-12 flex-1 rounded-xl bg-[#f97316] px-3 py-3 text-base leading-6 text-white hover:opacity-95"
              type="submit"
            >
              {editingBusiness ? "Save Changes" : "Save Business"}
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
