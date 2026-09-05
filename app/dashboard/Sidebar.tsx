import Image from "next/image";
import Link from "next/link";

const assetBase = "/assets/dashboard/";

const menuSections = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", icon: "imgElement2.svg", href: "/dashboard" }],
  },
  {
    title: "Directory",
    items: [
      { label: "Businesses", icon: "imgShop.svg", href: "/businesses" },
      { label: "Categories", icon: "imgTag2.svg", href: "/categories" },
      { label: "Notification", icon: "imgNotificationStatus.svg", href: "/notification" },
    ],
  },
  {
    title: "Offers",
    items: [{ label: "Coupons", icon: "imgTicket.svg", href: "/coupons" }],
  },
  {
    title: "People",
    items: [
      { label: "Users", icon: "imgUser.svg", href: "#" },
      { label: "Staff account", icon: "imgUserSquare.svg", href: "#" },
      { label: "Roles & Permissions", icon: "imgUserOctagon.svg", href: "#" },
    ],
  },
];

type SidebarProps = {
  activeItem?: string;
};

export default function Sidebar({ activeItem = "Dashboard" }: SidebarProps) {
  return (
    <aside className="sticky top-0 flex h-svh flex-col overflow-y-auto rounded-br-2xl border-r border-[#eef3f8] bg-white shadow-[0_1px_2px_-1px_rgba(12,74,110,0.16)]">
      <div className="flex min-h-[74px] items-center justify-center border-b border-[#eef3f8]">
        <Image
          src={`${assetBase}imgD69B5048473640DcAe8C611Eb64B3D721Vectorized.svg`}
          alt="CityDeals"
          width={185}
          height={54}
          priority
        />
      </div>

      <nav className="flex-1 px-4 pb-4 pt-5" aria-label="Dashboard navigation">
        {menuSections.map((section) => (
          <section className="mb-4" key={section.title}>
            <h2 className="mb-2 px-4 text-xs font-medium leading-4 text-[#315576]">
              {section.title}
            </h2>
            <div className="grid gap-1">
              {section.items.map((item) => (
                <Link
                  className={
                    item.label === activeItem
                      ? "flex min-h-10 items-center gap-2 rounded bg-[#0c4a6e] px-4 py-2 text-base leading-6 text-white [&_img]:brightness-0 [&_img]:invert"
                      : "flex min-h-10 items-center gap-2 rounded px-4 py-2 text-base leading-6 text-[#475569] no-underline hover:bg-slate-50"
                  }
                  href={item.href}
                  key={item.label}
                >
                  <Image src={`${assetBase}${item.icon}`} alt="" width={20} height={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </nav>

      <div className="border-t border-black/10 p-4">
        <Link
          className="flex min-h-14 items-center gap-3 rounded-lg p-2 text-[#475569] no-underline hover:bg-slate-50"
          href="/"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-slate-50">
            <Image src={`${assetBase}imgVuesaxLinearLogout.svg`} alt="" width={20} height={20} />
          </span>
          <span>
            <strong className="block text-sm font-medium leading-5 text-slate-900">Log Out</strong>
            <small className="block text-xs leading-4 text-slate-500">Exit admin panel</small>
          </span>
        </Link>
      </div>
    </aside>
  );
}
