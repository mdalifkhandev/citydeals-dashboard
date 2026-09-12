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
  },
];

const targets = [
  "All users",
  "Custom users",
  "Kendall users",
  "Miami Lakes users",
  "Saved coupon users",
  "Birthday users",
];

const birthdayOfferCategories = ["Food", "Cafe", "Beauty", "Shopping", "Entertainment"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(targets[0]);
  const [customUsers, setCustomUsers] = useState("");
  const [sendMode, setSendMode] = useState("Send now");
  const [birthdayPerksEnabled, setBirthdayPerksEnabled] = useState(true);
  const [birthdayCategory, setBirthdayCategory] = useState(birthdayOfferCategories[0]);
  const [birthdayLeadTime, setBirthdayLeadTime] = useState("On birthday");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(text: string) {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 2500);
  }

  function handleSendAnnouncement(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setNotifications((current) => [
      {
        title: title.trim(),
        message: message.trim(),
        time: "Just now",
        type: sendMode === "Birthday trigger" ? "Birthday Perk" : "Announcement",
        status: "Unread",
        target: target === "Custom users" && customUsers.trim() ? customUsers.trim() : target,
        trigger: sendMode,
      },
      ...current,
    ]);

    setTitle("");
    setMessage("");
    setTarget(targets[0]);
    setCustomUsers("");
    setSendMode("Send now");
    showToast(
      sendMode === "Birthday trigger"
        ? `Birthday perk scheduled for ${target}`
        : `Announcement sent to ${target}`
    );
  }

  function handleMarkAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, status: "Read" }))
    );
    showToast("All notifications marked as read");
  }

  return (
    <div className="w-full px-8 py-6">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-semibold leading-8 text-slate-900">Notifications</h1>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Send announcements to app users and review recent notification activity.
            </p>
          </div>
          <button
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            type="button"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </button>
        </div>

        <form
          className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"
          onSubmit={handleSendAnnouncement}
        >
          <div className="grid gap-4 md:grid-cols-[1fr_220px_220px]">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-900">Announcement title</span>
              <input
                className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400"
                placeholder="Weekend deals are live"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-900">Send to</span>
              <select
                className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400"
                value={target}
                onChange={(event) => setTarget(event.target.value)}
              >
                {targets.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-900">Trigger</span>
              <select
                className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400"
                value={sendMode}
                onChange={(event) => setSendMode(event.target.value)}
              >
                <option value="Send now">Send now</option>
                <option value="Schedule later">Schedule later</option>
                <option value="Birthday trigger">Birthday trigger</option>
              </select>
            </label>
          </div>

          {target === "Custom users" && (
            <label className="mt-4 grid gap-1">
              <span className="text-sm font-medium text-slate-900">Custom users</span>
              <input
                className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400"
                placeholder="Enter user emails or IDs separated by commas"
                value={customUsers}
                onChange={(event) => setCustomUsers(event.target.value)}
              />
            </label>
          )}

          <label className="mt-4 grid gap-1">
            <span className="text-sm font-medium text-slate-900">Message</span>
            <textarea
              className="min-h-24 resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400"
              placeholder="Write the announcement users will receive..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>

          <button
            className="mt-4 h-11 rounded-xl bg-[#f97316] px-5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
            type="submit"
          >
            Send Notifications
          </button>
        </form>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Birthday Perks</h2>
              <p className="mt-1 text-sm text-slate-500">
                Configure automatic birthday offers and birthday notification triggers.
              </p>
            </div>
            <button
              className={
                birthdayPerksEnabled
                  ? "h-10 rounded-xl bg-[#f97316] px-4 text-sm font-medium text-white"
                  : "h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700"
              }
              type="button"
              onClick={() => setBirthdayPerksEnabled((current) => !current)}
            >
              {birthdayPerksEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-900">Perk category</span>
              <select
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-400"
                value={birthdayCategory}
                onChange={(event) => setBirthdayCategory(event.target.value)}
              >
                {birthdayOfferCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-900">Send time</span>
              <select
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-400"
                value={birthdayLeadTime}
                onChange={(event) => setBirthdayLeadTime(event.target.value)}
              >
                <option value="On birthday">On birthday</option>
                <option value="1 day before">1 day before</option>
                <option value="7 days before">7 days before</option>
              </select>
            </label>

            <button
              className="mt-6 h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 hover:bg-slate-100 md:mt-auto"
              type="button"
              onClick={() =>
                showToast(
                  `Birthday perks saved: ${birthdayCategory}, ${birthdayLeadTime}`
                )
              }
            >
              Save Birthday Perks
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {notifications.map((notification) => {
            const unread = notification.status === "Unread";

            return (
              <article
                className="flex flex-wrap items-start gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-colors hover:bg-slate-50"
                key={`${notification.title}-${notification.time}`}
              >
                <span
                  className={`mt-2 size-3 rounded-full ${unread ? "bg-[#f97316]" : "bg-slate-300"}`}
                />
                <div className="min-w-[220px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold leading-6 text-slate-900">
                      {notification.title}
                    </h2>
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
                <div className="text-right">
                  <p className="text-sm leading-5 text-slate-500">{notification.time}</p>
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
