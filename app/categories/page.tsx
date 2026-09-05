"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/Modal";

const assetBase = "/assets/dashboard/";

const categories = [
  ["Financial District Plaza", "financial-district-plaza", "55 Water St, New York, NY 10004, USA"],
  ["Midtown East Suites", "midtown-east-suites", "600 Lexington Ave, New York, NY 10022, USA"],
  ["SoHo Art Gallery", "soho-art-gallery", "131 Grand St, New York, NY 10013, USA"],
  ["Battery Park Fitness", "battery-park-fitness", "75 Battery Pl, New York, NY 10280, USA"],
  ["Chelsea Market", "chelsea-market", "75 9th Ave, New York, NY 10011, USA"],
  ["Upper East Side Books", "upper-east-side-books", "123 Lexington Ave, New York, NY 10075, USA"],
  ["Greenwich Village Theater", "greenwich-village-theater", "50 W 13th St, New York, NY 10011, USA"],
  ["East Village Music Hall", "east-village-music-hall", "95 2nd Ave, New York, NY 10003, USA"],
  ["Tribeca Tech Hub", "tribeca-tech-hub", "200 Hudson St, New York, NY 10013, USA"],
  ["Harlem Jazz Cafe", "harlem-jazz-cafe", "230 W 125th St, New York, NY 10027, USA"],
];

const fields = [
  { label: "Category Name", placeholder: "Enter category name" },
  { label: "Slug", placeholder: "category-slug" },
  { label: "Description", placeholder: "Write category description", wide: true },
  { label: "Status", placeholder: "Select status", select: true },
];

export default function CategoriesPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="w-full px-8 py-6">
          <section className="w-full rounded-2xl border border-[#d1d5db] bg-white p-3">
            <div className="flex h-12 items-center justify-between gap-5">
              <div className="min-w-0">
                <h1 className="m-0 text-base font-normal leading-6 text-slate-900">
                  Coupon categories
                </h1>
                <p className="mt-1 truncate text-sm leading-5 text-[#475569]">
                  Categories drive how shoppers filter offers. Keep the list short, clear and
                  consistent across every city.
                </p>
              </div>
              <button
                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-3 py-3 text-base leading-6 text-white"
                type="button"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Image src={`${assetBase}imgAdd.svg`} alt="" width={24} height={24} />
                Add New category
              </button>
            </div>

            <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
              <div className="min-w-[760px]">
                <div className="grid h-[55px] grid-cols-[minmax(220px,1.1fr)_minmax(260px,1.8fr)_110px_90px] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
                  {["Name", "Description", "Status", "Actions"].map((heading) => (
                    <div className="border-r border-slate-300 px-3 last:border-r-0" key={heading}>
                      {heading}
                    </div>
                  ))}
                </div>

                {categories.map(([name, slug, description]) => (
                  <div
                    className="grid h-[52px] grid-cols-[minmax(220px,1.1fr)_minmax(260px,1.8fr)_110px_90px] items-center border-b border-dashed border-slate-200 bg-white last:border-b-0"
                    key={slug}
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
                          {name}
                        </strong>
                        <small className="block truncate text-xs leading-4 text-[#475569]">
                          {slug}
                        </small>
                      </span>
                    </div>
                    <p className="truncate px-3 text-sm leading-5 text-slate-900">{description}</p>
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
            </div>
          </section>

      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add New Category"
        subtitle="Enter category"
        maxWidth="max-w-[620px]"
      >
        <form className="flex flex-col gap-3">
          <div className="flex w-full items-center gap-6 rounded-3xl border border-[#e5e7eb] bg-gray-100 p-3.5">
            <span className="grid size-[76px] place-items-center rounded-2xl border-2 border-[#d1d5db] bg-white">
              <Image src={`${assetBase}imgTag2.svg`} alt="" width={36} height={36} />
            </span>
            <button
              className="h-12 rounded-lg border border-[#e5e7eb] bg-gray-50 px-3.5 py-3 text-base font-medium leading-6 text-gray-900 shadow-md"
              type="button"
            >
              Upload Icon
            </button>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-3.5">
            <div className="grid grid-cols-6 gap-x-4 gap-y-3.5">
              {fields.map((field) => (
                <label
                  className={field.wide ? "col-span-6 grid gap-1" : "col-span-3 grid gap-1"}
                  key={field.label}
                >
                  <span className="text-sm leading-5 text-slate-900">{field.label}</span>
                  <span className="flex h-[42px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm leading-[22px] tracking-[0.22px] text-[#475569]">
                    <input
                      className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#475569]"
                      placeholder={field.placeholder}
                    />
                    {field.select && (
                      <Image src={`${assetBase}imgArrowDown.svg`} alt="" width={24} height={24} />
                    )}
                  </span>
                </label>
              ))}
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
              Save Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
