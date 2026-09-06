"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const assetBase = "/assets/dashboard/";

const notifications = [
  {
    title: "New coupon redeemed",
    message: "Weekend BOGO was redeemed by a user.",
    time: "2 min ago",
    unread: true,
  },
  {
    title: "Business approved",
    message: "Harlem Jazz Cafe is now active.",
    time: "18 min ago",
    unread: true,
  },
  {
    title: "Campaign scheduled",
    message: "Free Delivery notification is ready to send.",
    time: "1 hour ago",
    unread: false,
  },
];

export default function Header() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    if (pathname.includes("businesses")) return "Businesses";
    if (pathname.includes("categories")) return "Categories";
    if (pathname.includes("coupons")) return "Coupons";
    if (pathname.includes("notification")) return "Notification";
    if (pathname.includes("users")) return "Users";
    if (pathname.includes("staff")) return "Staff accounts";
    if (pathname.includes("roles")) return "Roles & permissions";
    if (pathname.includes("search")) return "Search";
    if (pathname.includes("profile")) return "Profile";
    return "Dashboard";
  };

  return (
    <header className="flex h-[74px] items-center justify-between gap-6 border-b border-[#eef3f8] bg-white px-8 py-2">
      <div className="flex items-center gap-2 whitespace-nowrap text-sm leading-[22px] tracking-[0.22px]">
        <span className="text-[#919eab]">CityDeals</span>
        <span className="text-[#919eab]">/</span>
        <strong className="font-normal text-[#141a21]">{getPageTitle()}</strong>
      </div>

      <div className="flex items-center gap-4">
        <Link
          className="grid size-12 place-items-center rounded-[25px_22.5px_25px_25px] bg-slate-50 shadow-sm transition-colors hover:bg-slate-100"
          href="/search"
          aria-label="Search"
        >
          <Image src={`${assetBase}imgSearchNormal.svg`} alt="" width={24} height={24} />
        </Link>

        <div className="relative">
          <button
            className="relative grid size-12 place-items-center rounded-[25px_22.5px_25px_25px] bg-slate-50 shadow-sm transition-colors hover:bg-slate-100"
            type="button"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications((value) => !value)}
          >
            <Image src={`${assetBase}imgNotification.svg`} alt="" width={24} height={24} />
            <span className="absolute right-3 top-3 size-2 rounded-full bg-[#ff6b13]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-[58px] z-50 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <h2 className="text-base font-semibold leading-6 text-slate-900">Notifications</h2>
                  <p className="text-xs leading-4 text-slate-500">Latest app activity</p>
                </div>
                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-[#f97316]">
                  2 new
                </span>
              </div>

              <div className="max-h-[320px] overflow-y-auto p-2">
                {notifications.map((notification) => (
                  <div
                    className="flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50"
                    key={notification.title}
                  >
                    <span
                      className={`mt-1 size-2 rounded-full ${
                        notification.unread ? "bg-[#f97316]" : "bg-slate-300"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold leading-5 text-slate-900">
                        {notification.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-5 text-slate-600">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs leading-4 text-slate-400">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                className="block border-t border-slate-100 px-4 py-3 text-center text-sm font-medium text-[#0f5b78] transition-colors hover:bg-slate-50"
                href="/notifications"
                onClick={() => setShowNotifications(false)}
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>

        <Link
          className="flex h-[58px] w-[225px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-1.5 text-left transition-colors hover:bg-slate-100"
          href="/profile"
          aria-label="Profile"
        >
          <span className="grid size-[37px] place-items-center overflow-hidden rounded-lg border border-[#0c4a6e] p-0.5">
            <Image
              className="size-full rounded-md object-cover"
              src={`${assetBase}imgAdminAvatarNew.png`}
              alt=""
              width={33}
              height={33}
            />
          </span>
          <span className="min-w-0">
            <strong className="block text-base font-normal leading-6 text-slate-900">Admin</strong>
            <small className="block truncate text-sm leading-5 text-slate-600/65">
              jack.will95@gmail.com
            </small>
          </span>
        </Link>
      </div>
    </header>
  );
}

