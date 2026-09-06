const notifications = [
  {
    title: "New coupon redeemed",
    message: "Weekend BOGO was redeemed by a user.",
    time: "2 min ago",
    type: "Coupon",
    status: "Unread",
  },
  {
    title: "Business approved",
    message: "Harlem Jazz Cafe is now active and visible in the app.",
    time: "18 min ago",
    type: "Business",
    status: "Unread",
  },
  {
    title: "Campaign scheduled",
    message: "Free Delivery notification is ready to send tonight.",
    time: "1 hour ago",
    type: "Campaign",
    status: "Read",
  },
  {
    title: "New user registered",
    message: "A new shopper account joined from New York.",
    time: "3 hours ago",
    type: "User",
    status: "Read",
  },
  {
    title: "Coupon saved",
    message: "Cafe Combo was saved by 12 users today.",
    time: "Yesterday",
    type: "Coupon",
    status: "Read",
  },
];

export default function NotificationsPage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-semibold leading-8 text-slate-900">All notifications</h1>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              See every recent alert and app activity in one place.
            </p>
          </div>
          <button
            className="rounded-xl bg-[#f97316] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#ea580c]"
            type="button"
          >
            Mark all as read
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          {notifications.map((notification) => {
            const unread = notification.status === "Unread";

            return (
              <article
                className="flex flex-wrap items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors hover:bg-white"
                key={notification.title}
              >
                <span
                  className={`mt-2 size-3 rounded-full ${unread ? "bg-[#f97316]" : "bg-slate-300"}`}
                />
                <div className="min-w-[220px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold leading-6 text-slate-900">
                      {notification.title}
                    </h2>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[#0c4a6e]">
                      {notification.type}
                    </span>
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
    </div>
  );
}
