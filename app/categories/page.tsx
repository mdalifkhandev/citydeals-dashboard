"use client";

import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import Modal from "@/components/Modal";

const assetBase = "/assets/dashboard/";

const categories = [
  { name: "Food", slug: "food", description: "Restaurants, cafes and dining offers", status: "Active" },
  { name: "Shopping", slug: "shopping", description: "Retail stores, fashion and shopping deals", status: "Active" },
  { name: "Groceries", slug: "groceries", description: "Daily essentials and grocery coupons", status: "Active" },
  { name: "Electronics", slug: "electronics", description: "Devices, gadgets and tech offers", status: "Draft" },
  { name: "Fitness", slug: "fitness", description: "Gyms, wellness and active lifestyle deals", status: "Active" },
  { name: "Beauty", slug: "beauty", description: "Salon, spa and personal care coupons", status: "Draft" },
];

const fields = [
  { label: "Category Name", placeholder: "Enter category name" },
  { label: "Slug", placeholder: "category-slug" },
  { label: "Description", placeholder: "Write category description", wide: true },
  { label: "Status", placeholder: "Select status", select: true },
];

export default function CategoriesPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState(categories);
  const [editingCategory, setEditingCategory] = useState<(typeof categories)[number] | null>(null);
  const [openActionSlug, setOpenActionSlug] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (iconPreview) {
        URL.revokeObjectURL(iconPreview);
      }
    };
  }, [iconPreview]);

  function handleIconChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextPreview = URL.createObjectURL(file);
    setIconPreview((currentPreview) => {
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

  function handleEditCategory(category: (typeof categories)[number]) {
    setOpenActionSlug(null);
    setEditingCategory(category);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setEditingCategory(null);
  }

  function handleToggleStatus(slug: string) {
    setOpenActionSlug(null);
    setCategoryList((currentList) =>
      currentList.map((category) =>
        category.slug === slug
          ? { ...category, status: category.status === "Active" ? "Draft" : "Active" }
          : category
      )
    );

    const category = categoryList.find((item) => item.slug === slug);
    if (category) {
      showToast(
        `${category.name} ${category.status === "Active" ? "unpublished" : "published"}`
      );
    }
  }

  function handleDeleteCategory(slug: string) {
    setOpenActionSlug(null);
    const category = categoryList.find((item) => item.slug === slug);
    setCategoryList((currentList) => currentList.filter((item) => item.slug !== slug));

    if (category) {
      showToast(`Deleted ${category.name}`);
    }
  }

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

            <div className="mt-4 overflow-x-auto overflow-y-visible rounded-lg border border-slate-200">
              <div className="min-w-[760px]">
                <div className="grid h-[55px] grid-cols-[minmax(220px,1.1fr)_minmax(260px,1.8fr)_110px_90px] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
                  {["Name", "Description", "Status", "Actions"].map((heading) => (
                    <div className="border-r border-slate-300 px-3 last:border-r-0" key={heading}>
                      {heading}
                    </div>
                  ))}
                </div>

                {categoryList.map((category) => (
                  <div
                    className="grid h-[52px] grid-cols-[minmax(220px,1.1fr)_minmax(260px,1.8fr)_110px_90px] items-center border-b border-dashed border-slate-200 bg-white last:border-b-0"
                    key={category.slug}
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
                          {category.name}
                        </strong>
                        <small className="block truncate text-xs leading-4 text-[#475569]">
                          {category.slug}
                        </small>
                      </span>
                    </div>
                    <p className="truncate px-3 text-sm leading-5 text-slate-900">{category.description}</p>
                    <div className="px-3">
                      <span
                        className={
                          category.status === "Active"
                            ? "inline-flex h-6 items-center rounded bg-emerald-100 px-2 text-sm leading-5 text-[#16a34a]"
                            : "inline-flex h-6 items-center rounded bg-slate-100 px-2 text-sm leading-5 text-slate-600"
                        }
                      >
                        {category.status}
                      </span>
                    </div>
                    <div className="relative flex justify-center px-3">
                      <button
                        aria-expanded={openActionSlug === category.slug}
                        aria-label={`Open actions for ${category.name}`}
                        className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-lg font-bold leading-none text-[#0c4a6e] shadow-sm transition-colors hover:border-[#0c4a6e] hover:bg-sky-50"
                        type="button"
                        onClick={() =>
                          setOpenActionSlug((currentSlug) =>
                            currentSlug === category.slug ? null : category.slug
                          )
                        }
                      >
                        ⋮
                      </button>
                      {openActionSlug === category.slug && (
                        <div className="absolute right-3 top-10 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl">
                          <button
                            className="block w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50"
                            type="button"
                            onClick={() => handleEditCategory(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full px-3.5 py-2 text-left text-[#f97316] hover:bg-orange-50"
                            type="button"
                            onClick={() => handleToggleStatus(category.slug)}
                          >
                            {category.status === "Active" ? "Unpublish" : "Publish"}
                          </button>
                          <button
                            className="block w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50"
                            type="button"
                            onClick={() => handleDeleteCategory(category.slug)}
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

      <Modal
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        subtitle={editingCategory ? `Update ${editingCategory.name}` : "Enter category"}
        maxWidth="max-w-[620px]"
      >
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            showToast(editingCategory ? "Category changes saved" : "Category saved");
            handleCloseDrawer();
          }}
        >
          <div className="flex w-full items-center gap-6 rounded-3xl border border-[#e5e7eb] bg-gray-100 p-3.5">
          <span className="relative grid size-[76px] place-items-center overflow-hidden rounded-2xl border-2 border-[#d1d5db] bg-white">
            {iconPreview ? (
              <Image
                className="object-cover"
                src={iconPreview}
                alt=""
                fill
                sizes="76px"
                unoptimized
              />
            ) : (
              <Image src={`${assetBase}imgTag2.svg`} alt="" width={36} height={36} />
            )}
          </span>
          <label
            className="flex h-12 cursor-pointer items-center rounded-lg border border-[#e5e7eb] bg-gray-50 px-3.5 py-3 text-base font-medium leading-6 text-gray-900 shadow-md hover:bg-white"
            htmlFor="category-icon-upload"
          >
            Upload Icon
            <input
              className="sr-only"
              id="category-icon-upload"
              type="file"
              accept="image/*"
              onChange={handleIconChange}
            />
          </label>
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
              onClick={handleCloseDrawer}
            >
              Cancel
            </button>
            <button
              className="h-12 flex-1 rounded-xl bg-[#f97316] px-3 py-3 text-base leading-6 text-white hover:opacity-95"
              type="submit"
            >
              {editingCategory ? "Save Changes" : "Save Category"}
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
