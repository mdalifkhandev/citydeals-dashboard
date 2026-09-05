import Image from "next/image";

const assetBase = "/assets/dashboard/";

const stats = [
  { label: "Businesses", value: "342", icon: "imgShop1.svg", tone: "bg-[#dcfce7]" },
  { label: "Registered users", value: "12,345", icon: "imgUser1.svg", tone: "bg-[#ede9fe]" },
  { label: "Coupons", value: "74", icon: "imgTicket1.svg", tone: "bg-[#ffedd5]", meta: "55 live" },
  { label: "Coupons saved", value: "12", icon: "imgArchiveTick.svg", tone: "bg-[#dcfce7]" },
  { label: "Redemptions", value: "12", icon: "imgTicketExpired.svg", tone: "bg-[#dcfce7]" },
];

const xLabels = ["00:00", "02:00", "04:00", "06:00", "08:00"];
const yLabels = ["100", "80", "60", "40", "20", "0"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const barHeights = [32, 40, 30, 44, 65, 74, 58, 82, 96];
const trendingCoupons = ["Weekend BOGO", "Free Delivery", "20% Off Dinner", "Cafe Combo", "Gym Trial", "Spa Saver"];

export default function Dashboard() {
  return (
    <div className="w-full px-8 pb-[79px] pt-[18px]">
          <section
            className="grid grid-cols-[repeat(5,minmax(160px,1fr))] gap-4"
            aria-label="Dashboard stats"
          >
            {stats.map((stat) => (
              <article
                className="flex min-h-[93px] items-center gap-2.5 rounded-2xl bg-white px-2.5 py-3.5 shadow-[0_1px_1px_rgba(15,23,42,0.08),0_1px_1.5px_rgba(15,23,42,0.10)]"
                key={stat.label}
              >
                <div className={`grid size-10 shrink-0 place-items-center rounded-full ${stat.tone}`}>
                  <Image src={`${assetBase}${stat.icon}`} alt="" width={22} height={22} />
                </div>
                <div>
                  <p className="m-0 whitespace-nowrap text-sm leading-5 text-[#315576]">{stat.label}</p>
                  <strong className="mt-0.5 inline-block text-2xl font-semibold leading-8 text-slate-900">
                    {stat.value}
                  </strong>
                  {stat.meta && <span className="ml-2 text-xs leading-4 text-slate-500">{stat.meta}</span>}
                </div>
              </article>
            ))}
          </section>

          <section
            className="mt-4 min-h-[372px] rounded-2xl border border-[#d8d3c5] bg-white px-6 pb-[18px] pt-5"
            aria-labelledby="daily-title"
          >
            <h1 className="m-0 text-xl font-medium leading-7 text-slate-900" id="daily-title">
              Daily redemptions
            </h1>
            <p className="mt-0.5 text-sm leading-5 text-slate-500">
              Redemption activity across the selected day
            </p>

            <div className="mt-[18px] grid h-[284px] grid-cols-[34px_minmax(0,1fr)] gap-2.5">
              <div className="flex flex-col justify-between pb-7 text-right text-xs leading-4 text-slate-400">
                {yLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <div className="relative min-w-0">
                <div className="absolute inset-x-0 bottom-7 top-0 border-b border-l border-[#eef3f8] bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_44px,#eef3f8_45px)]" />
                <svg
                  className="absolute inset-x-0 top-0 h-[calc(100%-32px)] w-full"
                  viewBox="0 0 1010 230"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="dailyFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#fb923c" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#fb923c" stopOpacity="0.04" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 6 187 C 76 178 110 102 170 111 C 242 121 257 175 318 168 C 392 160 409 73 484 80 C 566 88 567 183 638 177 C 715 171 733 89 800 97 C 872 105 908 154 1004 136 L 1004 230 L 6 230 Z"
                    fill="url(#dailyFill)"
                  />
                  <path
                    d="M 6 187 C 76 178 110 102 170 111 C 242 121 257 175 318 168 C 392 160 409 73 484 80 C 566 88 567 183 638 177 C 715 171 733 89 800 97 C 872 105 908 154 1004 136"
                    fill="none"
                    stroke="#f97316"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs leading-4 text-slate-400">
                  {xLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4 grid grid-cols-2 gap-6">
            <article className="min-h-[356px] rounded-2xl border border-[#d8d3c5] bg-white px-6 py-5">
              <h2 className="m-0 text-xl font-medium leading-7 text-slate-900">Redemptions by Area</h2>
              <p className="mt-0.5 text-sm leading-5 text-slate-500">Monthly coupon redemption count</p>
              <div className="mt-[22px] grid h-[254px] grid-cols-9 items-end gap-4 border-b border-[#eef3f8] pt-4">
                {months.map((month, index) => (
                  <div
                    className="flex h-full flex-col items-center justify-end gap-2.5 text-xs leading-4 text-slate-500"
                    key={month}
                  >
                    <span
                      className="min-h-5 w-[26px] rounded-t-lg bg-[#16a34a] shadow-[inset_0_-10px_16px_rgba(12,74,110,0.12)]"
                      style={{ height: `${barHeights[index]}%` }}
                    />
                    <small>{month}</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="min-h-[356px] rounded-2xl border border-[#d8d3c5] bg-white px-6 py-5">
              <h2 className="m-0 text-xl font-medium leading-7 text-slate-900">Trending Coupons</h2>
              <p className="mt-0.5 text-sm leading-5 text-slate-500">Top saved and redeemed coupons</p>
              <div className="mt-[18px] grid gap-[15px]">
                {trendingCoupons.map((coupon) => (
                  <div className="grid gap-2" key={coupon}>
                    <div className="flex items-center justify-between gap-3 text-sm leading-5 text-slate-900">
                      <strong className="font-medium">{coupon}</strong>
                      <span className="text-slate-500">12%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-sky-200">
                      <span className="block h-full w-[35%] rounded-full bg-sky-600" />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
  );
}
