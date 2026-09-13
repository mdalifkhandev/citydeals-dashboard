"use client";

import { useMemo, useState } from "react";

type LegalPageStatus = "Published" | "Draft";

type LegalPage = {
  id: string;
  title: string;
  slug: string;
  version: string;
  status: LegalPageStatus;
  content: string;
  updatedAt: string;
};

const initialPages: LegalPage[] = [
  {
    id: "terms",
    title: "Terms of Use",
    slug: "terms-of-use",
    version: "1.0",
    status: "Published",
    updatedAt: "Sep 10, 2026",
    content:
      "Please read these terms and conditions carefully before using the CityDeals application.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    slug: "privacy-policy",
    version: "1.0",
    status: "Draft",
    updatedAt: "Sep 8, 2026",
    content:
      "This privacy policy explains how CityDeals collects, uses and protects user information.",
  },
  {
    id: "coupon-rules",
    title: "Coupon Rules",
    slug: "coupon-rules",
    version: "1.0",
    status: "Published",
    updatedAt: "Sep 5, 2026",
    content:
      "Coupons are subject to merchant availability, expiration dates and redemption limits.",
  },
];

export default function LegalPagesPage() {
  const [pages, setPages] = useState(initialPages);
  const [selectedId, setSelectedId] = useState(initialPages[0].id);
  const [title, setTitle] = useState(initialPages[0].title);
  const [slug, setSlug] = useState(initialPages[0].slug);
  const [version, setVersion] = useState(initialPages[0].version);
  const [status, setStatus] = useState<LegalPageStatus>(initialPages[0].status);
  const [content, setContent] = useState(initialPages[0].content);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedPage = useMemo(
    () => pages.find((page) => page.id === selectedId) ?? pages[0],
    [pages, selectedId]
  );

  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  }

  function loadPage(page: LegalPage) {
    setSelectedId(page.id);
    setTitle(page.title);
    setSlug(page.slug);
    setVersion(page.version);
    setStatus(page.status);
    setContent(page.content);
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!selectedPage || selectedPage.title === title) {
      setSlug(
        value
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  }

  function handleAddPage() {
    const nextPage: LegalPage = {
      id: Date.now().toString(),
      title: "New Legal Page",
      slug: "new-legal-page",
      version: "1.0",
      status: "Draft",
      updatedAt: "Just now",
      content: "",
    };

    setPages((currentPages) => [nextPage, ...currentPages]);
    loadPage(nextPage);
    showToast("New legal page created");
  }

  function handleSave() {
    if (!title.trim() || !slug.trim()) return;

    setPages((currentPages) =>
      currentPages.map((page) =>
        page.id === selectedId
          ? {
              ...page,
              title: title.trim(),
              slug: slug.trim(),
              version: version.trim() || "1.0",
              status,
              content,
              updatedAt: "Just now",
            }
          : page
      )
    );
    showToast(`${title.trim()} saved`);
  }

  function handleTogglePublish() {
    const nextStatus: LegalPageStatus = status === "Published" ? "Draft" : "Published";
    setStatus(nextStatus);
    setPages((currentPages) =>
      currentPages.map((page) =>
        page.id === selectedId ? { ...page, status: nextStatus, updatedAt: "Just now" } : page
      )
    );
    showToast(`${title} ${nextStatus === "Published" ? "published" : "moved to draft"}`);
  }

  function handleDelete() {
    if (pages.length <= 1) {
      showToast("At least one legal page is required");
      return;
    }

    const remainingPages = pages.filter((page) => page.id !== selectedId);
    setPages(remainingPages);
    loadPage(remainingPages[0]);
    showToast(`${title} deleted`);
  }

  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-slate-900">Legal Pages</h1>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Manage mobile app Terms of Use, Privacy Policy and coupon rules dynamically.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:shrink-0">
            <button
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium whitespace-nowrap text-slate-700 hover:bg-slate-50 sm:w-auto sm:min-w-24"
              type="button"
              onClick={handleAddPage}
            >
              Add Page
            </button>
            <button
              className="h-11 w-full rounded-xl bg-[#f97316] px-4 text-sm font-medium whitespace-nowrap text-white hover:opacity-95 sm:w-auto sm:min-w-28"
              type="button"
              onClick={handleSave}
            >
              Save Content
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            {pages.map((page) => {
              const active = page.id === selectedId;

              return (
                <button
                  className={
                    active
                      ? "grid w-full grid-cols-[1fr_84px] border-b border-slate-100 bg-orange-50 px-4 py-3 text-left text-sm last:border-b-0"
                      : "grid w-full grid-cols-[1fr_84px] border-b border-slate-100 px-4 py-3 text-left text-sm hover:bg-slate-50 last:border-b-0"
                  }
                  key={page.id}
                  type="button"
                  onClick={() => loadPage(page)}
                >
                  <span className="min-w-0 pr-2">
                    <strong className="block truncate text-slate-900">{page.title}</strong>
                    <small className="block truncate text-slate-500">
                      {page.slug} · v{page.version}
                    </small>
                    <small className="block text-slate-400">{page.updatedAt}</small>
                  </span>
                  <span
                    className={
                      page.status === "Published"
                        ? "mt-1 h-fit rounded-full bg-emerald-100 px-2 py-1 text-center text-xs font-medium text-emerald-700"
                        : "mt-1 h-fit rounded-full bg-slate-100 px-2 py-1 text-center text-xs font-medium text-slate-600"
                    }
                  >
                    {page.status}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="min-w-0 rounded-xl border border-slate-200 p-3 sm:p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="font-medium text-slate-900">Title</span>
                <input
                  className="h-10 min-w-0 rounded-lg border border-slate-200 px-3 outline-none focus:border-orange-400"
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="font-medium text-slate-900">Slug</span>
                <input
                  className="h-10 min-w-0 rounded-lg border border-slate-200 px-3 outline-none focus:border-orange-400"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="font-medium text-slate-900">Version</span>
                <input
                  className="h-10 min-w-0 rounded-lg border border-slate-200 px-3 outline-none focus:border-orange-400"
                  value={version}
                  onChange={(event) => setVersion(event.target.value)}
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="font-medium text-slate-900">Status</span>
                <select
                  className="h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-orange-400"
                  value={status}
                  onChange={(event) => setStatus(event.target.value as LegalPageStatus)}
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>
            </div>

            <label className="mt-3 grid gap-1 text-sm">
              <span className="font-medium text-slate-900">Content</span>
              <textarea
                className="min-h-56 resize-y rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-orange-400 sm:min-h-72"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </label>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
                type="button"
                onClick={handleTogglePublish}
              >
                {status === "Published" ? "Move to Draft" : "Publish"}
              </button>
              <button
                className="h-10 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-600 hover:bg-red-100"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
