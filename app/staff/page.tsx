"use client";

import { useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  currentRole: string;
}

const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "Shuvo",
    email: "example@gmail.com",
    currentRole: "Super Administrator",
  },
  {
    id: "2",
    name: "Shuvo",
    email: "example@gmail.com",
    currentRole: "Super Administrator",
  },
  {
    id: "3",
    name: "Anika",
    email: "anika@mail.com",
    currentRole: "Administrator",
  },
  {
    id: "4",
    name: "Ravi",
    email: "ravi123@domain.net",
    currentRole: "Manager",
  },
];

const availableRoles = [
  "Super Administrator",
  "Administrator",
  "Manager",
  "Editor",
  "Viewer",
];

export default function StaffAccountsPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRoleChange = (id: string, newRole: string) => {
    setStaffList((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, currentRole: newRole } : member
      )
    );

    const member = staffList.find((m) => m.id === id);
    if (member) {
      setToastMessage(`Updated ${member.name}'s role to "${newRole}"`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Super Administrator":
        return "bg-[#ede9fe] text-[#7c3aed]";
      case "Administrator":
        return "bg-blue-100 text-blue-700";
      case "Manager":
        return "bg-emerald-100 text-emerald-700";
      case "Editor":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="w-full px-8 py-6">
      <section className="w-full rounded-2xl border border-[#d1d5db] bg-white p-4">
        {/* Header Title & Description */}
        <div className="px-1 py-1">
          <h1 className="m-0 text-base font-normal leading-6 text-slate-900">
            Staff accounts & roles
          </h1>
          <p className="mt-1 text-sm leading-5 text-[#475569]">
            Give each team member exactly one role. Permissions attached to that role decide what they can reach.
          </p>
        </div>

        {/* Table Container */}
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
          <div className="min-w-[760px]">
            {/* Table Header */}
            <div className="grid h-[55px] grid-cols-[minmax(260px,1.2fr)_minmax(200px,1fr)_minmax(260px,1.2fr)] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
              <div className="border-r border-slate-300 px-6">Person</div>
              <div className="border-r border-slate-300 px-6">Current role</div>
              <div className="px-6">Assign role</div>
            </div>

            {/* Table Body */}
            {staffList.map((staff) => (
              <div
                className="grid h-[64px] grid-cols-[minmax(260px,1.2fr)_minmax(200px,1fr)_minmax(260px,1.2fr)] items-center border-b border-dashed border-slate-200 bg-white transition-colors hover:bg-slate-50/70 last:border-b-0"
                key={staff.id}
              >
                {/* Person Column */}
                <div className="min-w-0 px-6">
                  <strong className="block truncate text-sm font-normal leading-5 text-slate-900">
                    {staff.name}
                  </strong>
                  <small className="block truncate text-xs leading-4 text-[#475569]">
                    {staff.email}
                  </small>
                </div>

                {/* Current Role Column */}
                <div className="px-6">
                  <span
                    className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ${getRoleBadgeStyle(
                      staff.currentRole
                    )}`}
                  >
                    {staff.currentRole}
                  </span>
                </div>

                {/* Assign Role Dropdown */}
                <div className="px-6">
                  <div className="relative w-full max-w-[280px]">
                    <select
                      value={staff.currentRole}
                      onChange={(e) => handleRoleChange(staff.id, e.target.value)}
                      className="h-10 w-full appearance-none rounded-xl border border-[#fed7aa] bg-[#fff7ed] px-3.5 pr-9 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400 focus:bg-white"
                    >
                      {availableRoles.map((role) => (
                        <option value={role} key={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          <svg className="size-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
