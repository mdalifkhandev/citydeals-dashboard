"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If on root sign-in page, render clean without dashboard layout
  if (pathname === "/" || pathname === "/signin") {
    return <>{children}</>;
  }

  return (
    <div className="grid min-h-svh grid-cols-[272px_minmax(0,1fr)] bg-white text-slate-900">
      <Sidebar />
      <section className="min-w-0 flex flex-col">
        <Header />
        <main className="flex-1 min-w-0">{children}</main>
      </section>
    </div>
  );
}
