import Image from "next/image";

const assetBase = "/assets/dashboard/";

export default function ProfilePage() {
  return (
    <div className="w-full px-8 py-6">
      <section className="w-full rounded-2xl border border-[#d1d5db] bg-white p-3">
        <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <span className="grid size-20 place-items-center overflow-hidden rounded-2xl border border-[#0c4a6e] p-1">
            <Image
              className="size-full rounded-xl object-cover"
              src={`${assetBase}imgAdminAvatarNew.png`}
              alt=""
              width={72}
              height={72}
            />
          </span>
          <div>
            <h1 className="m-0 text-2xl font-semibold leading-8 text-slate-900">Admin</h1>
            <p className="mt-1 text-sm leading-5 text-[#475569]">jack.will95@gmail.com</p>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full name" value="Admin" />
            <Field label="Email" value="jack.will95@gmail.com" />
            <Field label="Role" value="Super Administrator" />
            <Field label="Status" value="Active" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm leading-5 text-slate-900">{label}</span>
      <input
        className="h-[42px] rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm leading-[22px] text-[#475569] outline-none"
        defaultValue={value}
      />
    </label>
  );
}
