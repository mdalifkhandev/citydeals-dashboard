"use client";

import { useState } from "react";
import Modal from "@/components/Modal";

type TicketStatus = "Open" | "Pending" | "Closed";

type SupportTicket = {
  id: string;
  user: string;
  email: string;
  message: string;
  status: TicketStatus;
  created: string;
  response?: string;
};

const initialTickets: SupportTicket[] = [
  {
    id: "#1001",
    user: "Nasimul Noyon",
    email: "nasimul@example.com",
    message: "My app is not working...",
    status: "Open",
    created: "2 min ago",
  },
  {
    id: "#1002",
    user: "Maya Carter",
    email: "maya@example.com",
    message: "Coupon did not redeem",
    status: "Pending",
    created: "1 hour ago",
    response: "We are checking this coupon redemption with the merchant.",
  },
  {
    id: "#1003",
    user: "Ravi Singh",
    email: "ravi@example.com",
    message: "Please update my email",
    status: "Closed",
    created: "Yesterday",
    response: "Your account email update request has been completed.",
  },
];

const ticketStatuses: TicketStatus[] = ["Open", "Pending", "Closed"];

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openStatusMenuId, setOpenStatusMenuId] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  }

  function openReply(ticket: SupportTicket) {
    setSelectedTicket(ticket);
    setReplyMessage(ticket.response ?? "");
  }

  function closeReply() {
    setSelectedTicket(null);
    setReplyMessage("");
  }

  function handleSendReply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTicket || !replyMessage.trim()) return;

    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              response: replyMessage.trim(),
              status: "Pending",
            }
          : ticket
      )
    );

    showToast(`Reply sent to ${selectedTicket.user}`);
    closeReply();
  }

  function handleStatusChange(id: string, status: TicketStatus) {
    setOpenStatusMenuId(null);
    setTickets((currentTickets) =>
      currentTickets.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket))
    );
    showToast(`Ticket ${id} marked ${status}`);
  }

  function getStatusClass(status: TicketStatus) {
    if (status === "Open") return "bg-orange-50 text-[#f97316]";
    if (status === "Pending") return "bg-blue-50 text-blue-700";
    return "bg-slate-100 text-slate-600";
  }

  function renderStatusMenu(ticket: SupportTicket) {
    const isOpen = openStatusMenuId === ticket.id;

    return (
      <div className="relative min-w-0">
        <button
          aria-expanded={isOpen}
          className="flex h-10 w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 text-left text-xs text-slate-700 outline-none transition-colors hover:border-[#f97316] hover:bg-orange-50 focus:border-[#f97316] focus:ring-2 focus:ring-orange-100 lg:h-9"
          type="button"
          onClick={() => setOpenStatusMenuId((currentId) => (currentId === ticket.id ? null : ticket.id))}
        >
          <span>{ticket.status}</span>
          <span className="text-[#f97316]">⌄</span>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[calc(100%+4px)] z-30 w-full min-w-36 overflow-hidden rounded-lg border border-orange-200 bg-white py-1 text-xs shadow-xl">
            {ticketStatuses.map((status) => {
              const isSelected = status === ticket.status;

              return (
                <button
                  className={
                    isSelected
                      ? "block w-full bg-[#f97316] px-3 py-2 text-left font-medium text-white"
                      : "block w-full px-3 py-2 text-left text-slate-700 hover:bg-orange-100 hover:text-orange-800"
                  }
                  key={status}
                  type="button"
                  onClick={() => handleStatusChange(ticket.id, status)}
                >
                  {status}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-slate-900">Help & Support Tickets</h1>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Review support requests, send replies and update ticket status.
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-2 text-sm sm:w-auto">
            {["Open", "Pending", "Closed"].map((status) => (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" key={status}>
                <span className="block text-xs text-slate-500">{status}</span>
                <strong className="text-slate-900">
                  {tickets.filter((ticket) => ticket.status === status).length}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:hidden">
          {tickets.map((ticket) => (
            <article
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
              key={ticket.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{ticket.id}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <h2 className="mt-2 text-sm font-medium leading-5 text-slate-900">
                    {ticket.user}
                  </h2>
                  <p className="truncate text-xs leading-4 text-slate-500">{ticket.email}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-500">{ticket.created}</span>
              </div>

              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <p className="text-sm leading-5 text-slate-900">{ticket.message}</p>
                {ticket.response && (
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Reply: {ticket.response}
                  </p>
                )}
              </div>

              <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                {renderStatusMenu(ticket)}
                <button
                  className="h-10 rounded-lg bg-[#f97316] px-4 text-xs font-medium text-white hover:opacity-95"
                  type="button"
                  onClick={() => openReply(ticket)}
                >
                  Reply
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 hidden overflow-x-auto overflow-y-visible rounded-xl border border-slate-200 lg:block">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-[100px_1fr_1.7fr_110px_120px_210px] bg-slate-100 text-sm text-[#315576]">
              {["Ticket", "User", "Message", "Status", "Created", "Actions"].map((heading) => (
                <div className="border-r border-slate-300 px-4 py-3 last:border-r-0" key={heading}>
                  {heading}
                </div>
              ))}
            </div>

            {tickets.map((ticket) => (
              <div
                className="grid grid-cols-[100px_1fr_1.7fr_110px_120px_210px] items-center border-t border-dashed border-slate-200 text-sm"
                key={ticket.id}
              >
                <div className="px-4 py-3 font-medium text-slate-900">{ticket.id}</div>
                <div className="min-w-0 px-4 py-3">
                  <strong className="block truncate text-sm font-normal text-slate-900">
                    {ticket.user}
                  </strong>
                  <small className="block truncate text-xs text-slate-500">{ticket.email}</small>
                </div>
                <div className="min-w-0 px-4 py-3">
                  <p className="truncate text-slate-900">{ticket.message}</p>
                  {ticket.response && (
                    <p className="mt-1 truncate text-xs text-slate-500">Reply: {ticket.response}</p>
                  )}
                </div>
                <div className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="px-4 py-3 text-slate-500">{ticket.created}</div>
                <div className="flex items-center gap-2 px-4 py-3">
                  <button
                    className="rounded-lg bg-[#f97316] px-3 py-2 text-xs font-medium text-white hover:opacity-95"
                    type="button"
                    onClick={() => openReply(ticket)}
                  >
                    Reply
                  </button>
                  <div className="w-28">{renderStatusMenu(ticket)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal
        isOpen={!!selectedTicket}
        onClose={closeReply}
        title={selectedTicket ? `Reply to ${selectedTicket.user}` : "Reply"}
        subtitle={selectedTicket ? `${selectedTicket.id} · ${selectedTicket.email}` : undefined}
        maxWidth="max-w-[560px]"
      >
        {selectedTicket && (
          <form className="flex flex-col gap-4" onSubmit={handleSendReply}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                User message
              </span>
              <p className="mt-1 text-sm leading-6 text-slate-900">{selectedTicket.message}</p>
            </div>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-900">Response</span>
              <textarea
                className="min-h-32 resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-400"
                placeholder="Write your response to the user..."
                value={replyMessage}
                onChange={(event) => setReplyMessage(event.target.value)}
              />
            </label>

            <div className="flex gap-3">
              <button
                className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 hover:bg-slate-50"
                type="button"
                onClick={closeReply}
              >
                Cancel
              </button>
              <button
                className="h-11 flex-1 rounded-xl bg-[#f97316] text-sm font-semibold text-white hover:opacity-95"
                type="submit"
              >
                Send Reply
              </button>
            </div>
          </form>
        )}
      </Modal>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
