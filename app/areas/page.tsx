"use client";

import { useState } from "react";
import Modal from "@/components/Modal";

const areas = [
  { name: "Kendall", slug: "kendall", city: "Kendall", state: "FL", merchants: 18, coupons: 42, qr: "Ready" },
  { name: "Miami Lakes", slug: "miami-lakes", city: "Miami Lakes", state: "FL", merchants: 12, coupons: 28, qr: "Ready" },
  { name: "Sarasota", slug: "sarasota", city: "Sarasota", state: "FL", merchants: 9, coupons: 21, qr: "Draft" },
];

export default function AreasPage() {
  const [areaList, setAreaList] = useState(areas);
  const [isAddAreaOpen, setIsAddAreaOpen] = useState(false);
  const [areaName, setAreaName] = useState("");
  const [areaSlug, setAreaSlug] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("FL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingAreaSlug, setEditingAreaSlug] = useState<string | null>(null);
  const [openActionSlug, setOpenActionSlug] = useState<string | null>(null);

  const handleAreaNameChange = (value: string) => {
    setAreaName(value);
    setAreaSlug(
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );
  };

  const handleAddArea = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!areaName.trim() || !areaSlug.trim() || !city.trim() || !state.trim()) return;

    if (editingAreaSlug) {
      setAreaList((prev) =>
        prev.map((area) =>
          area.slug === editingAreaSlug
            ? {
                ...area,
                name: areaName.trim(),
                slug: areaSlug.trim(),
                city: city.trim(),
                state: state.trim().toUpperCase(),
              }
            : area
        )
      );
      setIsAddAreaOpen(false);
      setEditingAreaSlug(null);
      setToastMessage(`Updated ${areaName.trim()} area`);
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }

    const nextArea = {
      name: areaName.trim(),
      slug: areaSlug.trim(),
      city: city.trim(),
      state: state.trim().toUpperCase(),
      merchants: 0,
      coupons: 0,
      qr: "Draft",
    };

    setAreaList((prev) => [nextArea, ...prev]);
    setAreaName("");
    setAreaSlug("");
    setCity("");
    setState("FL");
    setIsAddAreaOpen(false);
    setToastMessage(`Added ${nextArea.name} area`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCloseAreaModal = () => {
    setIsAddAreaOpen(false);
    setEditingAreaSlug(null);
    setAreaName("");
    setAreaSlug("");
    setCity("");
    setState("FL");
  };

  const handleEditArea = (area: (typeof areas)[number]) => {
    setOpenActionSlug(null);
    setEditingAreaSlug(area.slug);
    setAreaName(area.name);
    setAreaSlug(area.slug);
    setCity(area.city);
    setState(area.state);
    setIsAddAreaOpen(true);
  };

  const handleToggleAreaStatus = (slug: string) => {
    setOpenActionSlug(null);
    setAreaList((prev) =>
      prev.map((area) =>
        area.slug === slug ? { ...area, qr: area.qr === "Ready" ? "Draft" : "Ready" } : area
      )
    );

    const area = areaList.find((item) => item.slug === slug);
    if (area) {
      setToastMessage(`${area.name} ${area.qr === "Ready" ? "unpublished" : "published"}`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleDeleteArea = (slug: string) => {
    setOpenActionSlug(null);
    const area = areaList.find((item) => item.slug === slug);
    setAreaList((prev) => prev.filter((item) => item.slug !== slug));

    if (area) {
      setToastMessage(`Deleted ${area.name} area`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Areas / Directories</h1>
            <p className="mt-1 text-sm text-slate-500">Manage isolated city directories, app landing links and area QR destinations.</p>
          </div>
          <button
            className="h-11 w-full rounded-xl bg-[#f97316] px-4 text-sm font-medium text-white transition-opacity hover:opacity-95 sm:w-auto"
            type="button"
            onClick={() => {
              setEditingAreaSlug(null);
              setAreaName("");
              setAreaSlug("");
              setCity("");
              setState("FL");
              setIsAddAreaOpen(true);
            }}
          >
            Add area
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[`Total areas: ${areaList.length}`, "Active directories: 2", "QR codes ready: 2"].map((item) => (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={item}>
              <p className="text-sm font-medium text-slate-700">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:hidden">
          {areaList.map((area) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-4" key={area.slug}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-slate-900">{area.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{area.city}, {area.state}</p>
                  <p className="mt-1 break-all text-xs text-slate-500">/directory/{area.slug}</p>
                </div>
                <div className="relative shrink-0">
                  <button
                    aria-expanded={openActionSlug === area.slug}
                    aria-label={`Open actions for ${area.name}`}
                    className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-lg font-bold leading-none text-[#0c4a6e] shadow-sm transition-colors hover:border-[#0c4a6e] hover:bg-sky-50"
                    type="button"
                    onClick={() =>
                      setOpenActionSlug((currentSlug) =>
                        currentSlug === area.slug ? null : area.slug
                      )
                    }
                  >
                    ⋮
                  </button>
                  {openActionSlug === area.slug && (
                    <div className="absolute right-0 top-11 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl">
                      <button
                        className="block w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50"
                        type="button"
                        onClick={() => handleEditArea(area)}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full px-3.5 py-2 text-left text-[#f97316] hover:bg-orange-50"
                        type="button"
                        onClick={() => handleToggleAreaStatus(area.slug)}
                      >
                        {area.qr === "Ready" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        className="block w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50"
                        type="button"
                        onClick={() => handleDeleteArea(area.slug)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <span className="block text-xs text-slate-500">Merchants</span>
                  <strong className="text-slate-900">{area.merchants}</strong>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <span className="block text-xs text-slate-500">Coupons</span>
                  <strong className="text-slate-900">{area.coupons}</strong>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <span className="block text-xs text-slate-500">QR</span>
                  <strong
                    className={
                      area.qr === "Ready"
                        ? "text-xs font-semibold text-emerald-700"
                        : "text-xs font-semibold text-slate-600"
                    }
                  >
                    {area.qr}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 hidden overflow-x-auto overflow-y-visible rounded-xl border border-slate-200 md:block">
          <div className="grid grid-cols-[1.2fr_1fr_120px_120px_120px_90px] bg-slate-100 text-sm text-[#315576]">
            {["Area", "Directory URL", "Merchants", "Coupons", "QR", "Actions"].map((h) => <div className="border-r border-slate-300 px-4 py-3 last:border-r-0" key={h}>{h}</div>)}
          </div>
          {areaList.map((area) => (
            <div className="grid grid-cols-[1.2fr_1fr_120px_120px_120px_90px] border-t border-dashed border-slate-200 text-sm" key={area.slug}>
              <div className="px-4 py-3"><strong>{area.name}</strong><p className="text-xs text-slate-500">{area.city}, {area.state}</p></div>
              <div className="px-4 py-3 text-slate-700">/directory/{area.slug}</div>
              <div className="px-4 py-3">{area.merchants}</div>
              <div className="px-4 py-3">{area.coupons}</div>
              <div className="px-4 py-3">
                <span
                  className={
                    area.qr === "Ready"
                      ? "rounded bg-emerald-100 px-2 py-1 text-xs text-emerald-700"
                      : "rounded bg-slate-100 px-2 py-1 text-xs text-slate-600"
                  }
                >
                  {area.qr}
                </span>
              </div>
              <div className="relative flex justify-center px-4 py-3">
                <button
                  aria-expanded={openActionSlug === area.slug}
                  aria-label={`Open actions for ${area.name}`}
                  className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-lg font-bold leading-none text-[#0c4a6e] shadow-sm transition-colors hover:border-[#0c4a6e] hover:bg-sky-50"
                  type="button"
                  onClick={() =>
                    setOpenActionSlug((currentSlug) =>
                      currentSlug === area.slug ? null : area.slug
                    )
                  }
                >
                  ⋮
                </button>
                {openActionSlug === area.slug && (
                  <div className="absolute right-4 top-12 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl">
                    <button
                      className="block w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50"
                      type="button"
                      onClick={() => handleEditArea(area)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full px-3.5 py-2 text-left text-[#f97316] hover:bg-orange-50"
                      type="button"
                      onClick={() => handleToggleAreaStatus(area.slug)}
                    >
                      {area.qr === "Ready" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      className="block w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50"
                      type="button"
                      onClick={() => handleDeleteArea(area.slug)}
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
        isOpen={isAddAreaOpen}
        onClose={handleCloseAreaModal}
        title={editingAreaSlug ? "Edit Area" : "Add Area"}
        subtitle={
          editingAreaSlug
            ? "Update this city directory"
            : "Create a new city directory for the mobile app"
        }
        maxWidth="max-w-[520px]"
      >
        <form className="flex flex-col gap-4" onSubmit={handleAddArea}>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="grid gap-3.5">
              <label className="grid gap-1">
                <span className="text-sm leading-5 text-slate-900">Area name</span>
                <input
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:bg-white"
                  placeholder="Kendall"
                  value={areaName}
                  onChange={(event) => handleAreaNameChange(event.target.value)}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm leading-5 text-slate-900">Directory slug</span>
                <input
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:bg-white"
                  placeholder="kendall"
                  value={areaSlug}
                  onChange={(event) => setAreaSlug(event.target.value)}
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-sm leading-5 text-slate-900">City</span>
                  <input
                    className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:bg-white"
                    placeholder="Miami"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm leading-5 text-slate-900">State</span>
                  <input
                    className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:bg-white"
                    placeholder="FL"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
              type="button"
              onClick={handleCloseAreaModal}
            >
              Cancel
            </button>
            <button
              className="h-11 flex-1 rounded-xl bg-[#f97316] text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
              type="submit"
            >
              {editingAreaSlug ? "Save Changes" : "Save Area"}
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
