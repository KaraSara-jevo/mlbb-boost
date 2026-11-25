import { useState } from 'react'
import { ArrowUpRight, Gem, MessageCircle, ShieldCheck } from 'lucide-react'

const MMK_PER_100K = 100_000
const THB_PER_100K_MMK = 750
const THB_PER_USD = 34.5

const TOP_UP_PACKAGES = [
  { id: 'weekly-pass', name: 'Weekly Diamond Pass', mmk: 6000, category: 'pass' },
  { id: 'twilight-pass', name: 'Twilight Pass', mmk: 33000, category: 'pass' },
  { id: 'diamonds-86', name: '86 Diamonds', mmk: 5000, category: 'diamonds' },
  { id: 'diamonds-172', name: '172 Diamonds', mmk: 10000, category: 'diamonds' },
  { id: 'diamonds-257', name: '257 Diamonds', mmk: 15000, category: 'diamonds' },
  { id: 'diamonds-343', name: '343 Diamonds', mmk: 20000, category: 'diamonds' },
  { id: 'diamonds-429', name: '429 Diamonds', mmk: 25000, category: 'diamonds' },
  { id: 'diamonds-514', name: '514 Diamonds', mmk: 30000, category: 'diamonds' },
  { id: 'diamonds-600', name: '600 Diamonds', mmk: 35000, category: 'diamonds' },
  { id: 'diamonds-706', name: '706 Diamonds', mmk: 40000, category: 'diamonds' },
  { id: 'diamonds-878', name: '878 Diamonds', mmk: 50000, category: 'diamonds' },
  { id: 'diamonds-963', name: '963 Diamonds', mmk: 55000, category: 'diamonds' },
  { id: 'diamonds-1135', name: '1,135 Diamonds', mmk: 65000, category: 'diamonds' },
  { id: 'diamonds-1412', name: '1,412 Diamonds', mmk: 80000, category: 'diamonds' },
  { id: 'diamonds-2195', name: '2,195 Diamonds', mmk: 120000, category: 'diamonds' },
  { id: 'diamonds-3688', name: '3,688 Diamonds', mmk: 200000, category: 'diamonds' },
  { id: 'diamonds-5532', name: '5,532 Diamonds', mmk: 300000, category: 'diamonds' },
  { id: 'diamonds-9288', name: '9,288 Diamonds', mmk: 500000, category: 'diamonds' },
]

const TELEGRAM_URL = 'https://t.me/zennzenn2003'

export default function DiamondTopUpSection() {
  const [currency, setCurrency] = useState('MMK')
  const passes = TOP_UP_PACKAGES.filter((item) => item.category === 'pass')
  const diamondPackages = TOP_UP_PACKAGES.filter((item) => item.category === 'diamonds')

  function formatPrice(item) {
    if (currency === 'MMK') return `${item.mmk.toLocaleString('en-US')} Ks`
    const thbPrice = Math.round((item.mmk / MMK_PER_100K) * THB_PER_100K_MMK)
    if (currency === 'THB') return `${thbPrice.toLocaleString('en-US')} Baht`
    return `$${(thbPrice / THB_PER_USD).toFixed(2)}`
  }

  function getOrderUrl(item) {
    const message = `Hi Zenn, I want to order ${item.name} (${formatPrice(item)} / ${currency}).`
    return `${TELEGRAM_URL}?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="diamonds" className="scroll-mt-24 border-y border-white/[0.08] bg-slate-950/75 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">MLBB · Diamond top-up</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Top up. <span className="text-amber-300">Jump in.</span></h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">Choose a pass or diamond bundle and order directly through Telegram.</p>
          </div>
          <div className="flex w-fit rounded-xl border border-white/10 bg-slate-900 p-1" aria-label="Top-up currency">
            {[{ code: 'MMK', symbol: 'Ks' }, { code: 'THB', symbol: 'Baht' }, { code: 'USD', symbol: '$' }].map(({ code, symbol }) => <button key={code} type="button" aria-label={`${code} (${symbol})`} aria-pressed={currency === code} onClick={() => setCurrency(code)} className={`min-h-10 rounded-lg px-3 text-[10px] font-extrabold transition sm:px-4 sm:text-xs ${currency === code ? 'bg-amber-300 text-slate-950 shadow-[0_0_18px_rgba(252,211,77,0.18)]' : 'text-slate-400 hover:text-white'}`}>{code} <span className="opacity-70">({symbol})</span></button>)}
          </div>
        </div>

        <p className="-mt-4 mb-6 text-[10px] text-slate-400">Rate note: 1 USD ≈ {THB_PER_USD} THB. THB prices use 100,000 Ks = 750 Baht.</p>

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] p-4 sm:flex-row sm:items-center">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-300/10 text-emerald-300"><ShieldCheck size={20} /></span>
          <p className="text-xs font-extrabold leading-5 text-emerald-100">100% Privacy Protected — Select a package and chat directly on Telegram to order.</p>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-emerald-300/20 px-3 text-[11px] font-bold text-emerald-200 transition hover:bg-emerald-300/10 sm:ml-auto"><MessageCircle size={14} /> Chat on Telegram <ArrowUpRight size={13} /></a>
        </div>

        <PackageGroup title="Special passes" packages={passes} currency={currency} formatPrice={formatPrice} getOrderUrl={getOrderUrl} accent="amber" />
        <PackageGroup title="Diamond packages" packages={diamondPackages} currency={currency} formatPrice={formatPrice} getOrderUrl={getOrderUrl} accent="cyan" />
      </div>
    </section>
  )
}

function PackageGroup({ title, packages, currency, formatPrice, getOrderUrl, accent }) {
  const isPass = accent === 'amber'
  return (
    <div className={isPass ? '' : 'mt-9'}>
      <h3 className={`mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] ${isPass ? 'text-amber-300' : 'text-cyan-300'}`}><Gem size={14} /> {title}</h3>
      <div className={`grid gap-3 ${isPass ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
        {packages.map((item) => <PackageCard key={item.id} item={item} currency={currency} isPass={isPass} price={formatPrice(item)} orderUrl={getOrderUrl(item)} />)}
      </div>
    </div>
  )
}

function PackageCard({ item, currency, isPass, price, orderUrl }) {
  return (
    <article className="group flex min-h-[148px] flex-col justify-between rounded-2xl border border-white/[0.1] bg-slate-900/90 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-slate-800/95">
      <div className="flex items-start justify-between gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-xl border ${isPass ? 'border-amber-300/20 bg-amber-300/10 text-amber-300' : 'border-cyan-300/20 bg-cyan-300/10 text-cyan-300'}`}><Gem size={20} /></span>
        <span className="rounded-md border border-white/[0.08] bg-slate-950/70 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-slate-400">{isPass ? 'Special pass' : 'MLBB diamonds'}</span>
      </div>
      <div className="mt-4"><h4 className="text-sm font-extrabold text-white">{item.name}</h4><p className="mt-1 text-lg font-black text-amber-300">{price}</p></div>
      <a href={orderUrl} target="_blank" rel="noreferrer" aria-label={`Order ${item.name} for ${price} on Telegram`} className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] px-3 text-[11px] font-extrabold text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-300 hover:text-slate-950">Order on Telegram <ArrowUpRight size={14} /><span className="sr-only">Price displayed in {currency}</span></a>
    </article>
  )
}
