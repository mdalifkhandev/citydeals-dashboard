import Image from "next/image";

const assetBase = "/assets/dashboard/";

export default function NotificationPage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="w-full rounded-2xl border border-[#d1d5db] bg-white p-3">
        <div className="px-3 pt-1">
          <h1 className="m-0 text-2xl font-semibold leading-8 text-slate-900">
            Push notification
          </h1>
          <p className="mt-1 text-sm leading-5 text-[#475569]">
            Send instant or recurring notification to all app users
          </p>
        </div>

        <form className="mt-3 rounded-3xl border border-[#e5e7eb] bg-white p-3.5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
            <Field label="Notification Title" placeholder="Label" />
            <Field label="Send to" placeholder="All users" select />

            <label className="col-span-2 grid gap-1">
              <span className="text-sm leading-5 text-slate-900">Message</span>
              <textarea
                className="min-h-[86px] resize-none rounded-lg border border-slate-200 bg-slate-100 px-3 py-3 text-sm leading-[22px] tracking-[0.22px] text-slate-900 outline-none placeholder:text-slate-400"
                placeholder="Notification message..."
              />
            </label>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <h2 className="m-0 text-base font-normal leading-6 text-slate-900">Scheduling</h2>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4">
            <div>
              <Field label="Notification Title" placeholder="" />
              <p className="mt-1 text-xs leading-4 text-[#475569]">
                Choose when the notification should be sent.
              </p>
            </div>
            <div>
              <Field label="Repeat" placeholder="Do not repeat" select />
              <p className="mt-1 text-xs leading-4 text-[#475569]">
                Choose how often the notification should repeat.
              </p>
            </div>
          </div>
        </form>

        <button
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] px-3 py-3 text-base leading-6 text-white"
          type="button"
        >
          <span className="text-2xl leading-none">⌁</span>
          Send Notification
        </button>
      </section>
    </div>
  );
}

function Field({
  label,
  placeholder,
  select = false,
}: {
  label: string;
  placeholder: string;
  select?: boolean;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm leading-5 text-slate-900">{label}</span>
      <span className="flex h-[42px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm leading-[22px] tracking-[0.22px] text-[#475569]">
        <input
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#475569]"
          placeholder={placeholder}
        />
        {select && <Image src={`${assetBase}imgArrowDown.svg`} alt="" width={24} height={24} />}
      </span>
    </label>
  );
}
