"use client";

import { useState } from "react";

type NotificationItem = {
  title: string;
  message: string;
  time: string;
  type: string;
  status: "Read" | "Unread";
  target: string;
  trigger?: string;
};

const initialNotifications: NotificationItem[] = [
  {
    title: "New coupon redeemed",
    message: "Weekend BOGO was redeemed by a user.",
    time: "2 min ago",
    type: "Coupon",
    status: "Unread",
    target: "Admin",
  },
  {
    title: "Business approved",
    message: "Harlem Jazz Cafe is now active and visible in the app.",
    time: "18 min ago",
    type: "Business",
    status: "Unread",
    target: "Admin",
  },
  {
    title: "Weekend deals are live",
    message: "Fresh local offers are ready near you.",
    time: "Yesterday",
    type: "Announcement",
    status: "Read",
    target: "All users",
    trigger: "Send now",
  },
  {
    title: "Birthday treat unlocked",
    message: "Your birthday perk is ready to redeem today.",
    time: "2 days ago",
    type: "Birthday Perk",
    status: "Read",
    target: "Birthday users",
    trigger: "Birthday trigger",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(text: string) {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 2500);
  }

  function handleMarkAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, status: "Read" }))
    );
    showToast("All notifications marked as read");
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "All") return true;
    return notification.status === filter || notification.type === filter;
  });

  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold leading-8 text-slate-900">
              Notification Inbox
            </h1>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Review received alerts, sent announcements and recent notification activity.
            </p>
          </div>
          <div className="grid w-full gap-2 sm:grid-cols-[1fr_auto] lg:w-auto">
            <select
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-orange-400 lg:min-w-44"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              {["All", "Unread", "Read", "Announcement", "Birthday Perk", "Coupon", "Business"].map(
                (item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              )} 
            </select>
            <button
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium whitespace-nowrap text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              type="button"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {filteredNotifications.map((notification) => {
            const unread = notification.status === "Unread";

            return (
              <article
                className="grid gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-4 transition-colors hover:bg-slate-50 sm:px-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start"
                key={`${notification.title}-${notification.time}`}
              >
                <span
                  className={`hidden size-3 rounded-full md:mt-2 md:block ${unread ? "bg-[#f97316]" : "bg-slate-300"}`}
                />
                <div className="min-w-0">
                  <div className="flex items-start gap-2 md:hidden">
                    <span
                      className={`mt-2 size-3 shrink-0 rounded-full ${
                        unread ? "bg-[#f97316]" : "bg-slate-300"
                      }`}
                    />
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold leading-6 text-slate-900">
                        {notification.title}
                      </h2>
                      <p className="text-xs leading-4 text-slate-500">{notification.time}</p>
                    </div>
                  </div>

                  <div className="hidden flex-wrap items-center gap-2 md:flex">
                    <h2 className="text-base font-semibold leading-6 text-slate-900">
                      {notification.title}
                    </h2>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-0">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-[#0c4a6e]">
                      {notification.type}
                    </span>
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-[#f97316]">
                      {notification.target}
                    </span>
                    {notification.trigger && (
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {notification.trigger}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{notification.message}</p>
                </div>
                <div className="flex items-center justify-end gap-3 md:block md:text-right">
                  <p className="hidden text-sm leading-5 text-slate-500 md:block">{notification.time}</p>
                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      unread ? "bg-orange-50 text-[#f97316]" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {notification.status}
                  </span>
                </div>
              </article>
            );
          })}
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
