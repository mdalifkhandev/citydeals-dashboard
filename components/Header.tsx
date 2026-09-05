"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const assetBase = "/assets/dashboard/";

export default function Header() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("businesses")) return "Businesses";
    if (pathname.includes("categories")) return "Categories";
    if (pathname.includes("coupons")) return "Coupons";
    if (pathname.includes("notification")) return "Notification";
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
        <button
          className="grid size-12 place-items-center rounded-[25px_22.5px_25px_25px] bg-slate-50 shadow-sm transition-colors hover:bg-slate-100"
          type="button"
          aria-label="Search"
        >
          <Image src={`${assetBase}imgSearchNormal.svg`} alt="" width={24} height={24} />
        </button>
        <button
          className="grid size-12 place-items-center rounded-[25px_22.5px_25px_25px] bg-slate-50 shadow-sm transition-colors hover:bg-slate-100"
          type="button"
          aria-label="Notifications"
        >
          <Image src={`${assetBase}imgNotification.svg`} alt="" width={24} height={24} />
        </button>
        <button
          className="flex h-[58px] w-[225px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-1.5 text-left transition-colors hover:bg-slate-100"
          type="button"
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
        </button>
      </div>
    </header>
  );
}
