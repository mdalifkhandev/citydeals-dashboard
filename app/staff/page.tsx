"use client";

import { useState } from "react";
import Modal from "@/components/Modal";

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
  "Administrator",
  "Manager",
  "Editor",
  "Viewer",
];

export default function StaffAccountsPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("Administrator");

  const handleRoleChange = (id: string, newRole: string) => {
    if (newRole === "Super Administrator") return;

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

  const handleRemoveStaff = (id: string) => {
    const member = staffList.find((staff) => staff.id === id);

    setStaffList((prev) => prev.filter((staff) => staff.id !== id));

    if (member) {
      setToastMessage(`Removed ${member.name} from staff accounts`);
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

  const handleAddStaff = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newStaffName.trim() || !newStaffEmail.trim()) return;

    const nextStaff: StaffMember = {
      id: Date.now().toString(),
      name: newStaffName.trim(),
      email: newStaffEmail.trim(),
      currentRole: newStaffRole,
    };

    setStaffList((prev) => [nextStaff, ...prev]);
    setNewStaffName("");
    setNewStaffEmail("");
    setNewStaffRole("Administrator");
    setIsAddStaffOpen(false);
    setToastMessage(`Added ${nextStaff.name} as "${nextStaff.currentRole}"`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full px-8 py-6">
      <section className="w-full rounded-2xl border border-[#d1d5db] bg-white p-4">
        {/* Header Title & Description */}
        <div className="flex items-start justify-between gap-4 px-1 py-1">
          <div className="min-w-0">
            <h1 className="m-0 text-base font-normal leading-6 text-slate-900">
              Staff accounts & roles
            </h1>
            <p className="mt-1 text-sm leading-5 text-[#475569]">
              Give each team member exactly one role. Permissions attached to that role decide what they can reach.
            </p>
          </div>
          <button
            className="flex h-12 shrink-0 items-center justify-center rounded-xl bg-[#f97316] px-4 py-3 text-base leading-6 text-white transition-opacity hover:opacity-95"
            type="button"
            onClick={() => setIsAddStaffOpen(true)}
          >
            Add Staff
          </button>
        </div>

        {/* Table Container */}
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
          <div className="min-w-[900px]">
            {/* Table Header */}
            <div className="grid h-[55px] grid-cols-[minmax(260px,1.2fr)_minmax(200px,1fr)_minmax(260px,1.2fr)_140px] items-center bg-slate-100 text-sm leading-5 text-[#315576]">
              <div className="border-r border-slate-300 px-6">Person</div>
              <div className="border-r border-slate-300 px-6">Current role</div>
              <div className="border-r border-slate-300 px-6">Assign role</div>
              <div className="px-6">Action</div>
            </div>

            {/* Table Body */}
            {staffList.map((staff) => (
              <div
                className="grid h-[64px] grid-cols-[minmax(260px,1.2fr)_minmax(200px,1fr)_minmax(260px,1.2fr)_140px] items-center border-b border-dashed border-slate-200 bg-white transition-colors hover:bg-slate-50/70 last:border-b-0"
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
                  {staff.currentRole === "Super Administrator" ? (
                    <div className="flex h-10 w-full max-w-[280px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-500">
                      Protected role
                    </div>
                  ) : (
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
                  )}
                </div>

                {/* Remove Staff */}
                <div className="px-6">
                  <button
                    className="h-10 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-100"
                    type="button"
                    onClick={() => handleRemoveStaff(staff.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal
        isOpen={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
        title="Add Staff"
        subtitle="Create a dashboard staff account and assign a role"
        maxWidth="max-w-[520px]"
      >
        <form className="flex flex-col gap-4" onSubmit={handleAddStaff}>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="grid gap-3.5">
              <label className="grid gap-1">
                <span className="text-sm leading-5 text-slate-900">Full name</span>
                <input
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:bg-white"
                  placeholder="Enter staff full name"
                  value={newStaffName}
                  onChange={(event) => setNewStaffName(event.target.value)}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm leading-5 text-slate-900">Email address</span>
                <input
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:bg-white"
                  placeholder="staff@example.com"
                  type="email"
                  value={newStaffEmail}
                  onChange={(event) => setNewStaffEmail(event.target.value)}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm leading-5 text-slate-900">Role</span>
                <select
                  className="h-11 rounded-xl border border-[#fed7aa] bg-[#fff7ed] px-3.5 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400 focus:bg-white"
                  value={newStaffRole}
                  onChange={(event) => setNewStaffRole(event.target.value)}
                >
                  {availableRoles.map((role) => (
                    <option value={role} key={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
              type="button"
              onClick={() => setIsAddStaffOpen(false)}
            >
              Cancel
            </button>
            <button
              className="h-11 flex-1 rounded-xl bg-[#f97316] text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
              type="submit"
            >
              Save Staff
            </button>
          </div>
        </form>
      </Modal>

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
