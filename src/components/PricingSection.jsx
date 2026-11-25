import { ArrowRight, Check, Crown, Minus, Plus } from 'lucide-react'
import { PRICING_TIERS } from '../data/pricing'
import { EPIC_TO_MYTHIC_PRICE } from '../data/pricing'
import { formatPrice } from '../utils/currency'

const TIER_TONES = {
  amber: 'text-amber-300 bg-amber-300/10 border-amber-300/15',
  cyan: 'text-cyan-300 bg-cyan-300/10 border-cyan-300/15',
  violet: 'text-violet-300 bg-violet-300/10 border-violet-300/15',
  rose: 'text-rose-300 bg-rose-300/10 border-rose-300/15',
}

export default function PricingSection({ currency, packageSelected, onPackageToggle, stars, onStarChange, total, onOrder }) {
  const totalStars = Object.values(stars).reduce((sum, count) => sum + count, 0)
  return (
    <section id="rank-boost" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end"><div><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">01 / Choose your climb</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Find your next <span className="text-amber-300">rank.</span></h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">Pick a quick package or build your own climb star by star. Your total updates as you go.</p></div><div className="flex items-center gap-2 text-[10px] font-medium text-slate-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Prices shown in <b className="text-white">{currency}</b></div></div>

      <PackageCard selected={packageSelected} currency={currency} onToggle={onPackageToggle} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{PRICING_TIERS.map((tier) => <StarTierCard key={tier.id} tier={tier} count={stars[tier.id]} currency={currency} onChange={onStarChange} />)}</div>
      <OrderEstimate currency={currency} total={total} totalStars={totalStars} packageSelected={packageSelected} onOrder={onOrder} />
    </section>
  )
}

function PackageCard({ selected, currency, onToggle }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={selected} className={`group relative mb-6 flex w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border p-5 text-left transition sm:flex-row sm:items-center sm:p-6 ${selected ? 'border-amber-300/60 bg-slate-900/95 shadow-[0_0_36px_rgba(251,191,36,0.07)]' : 'border-white/15 bg-slate-900/85 hover:border-amber-300/30'}`}>
      <div className="absolute right-0 top-0 h-32 w-48 bg-amber-300/[0.06] blur-3xl" />
      <div className="relative flex items-center gap-4"><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition ${selected ? 'border-amber-300/30 bg-amber-300/15 text-amber-300' : 'border-white/10 bg-white/[0.04] text-slate-300 group-hover:text-amber-300'}`}><Crown size={23} /></span><span><span className="flex flex-wrap items-center gap-2 text-sm font-extrabold sm:text-base">Epic to Mythic Package <span className="rounded-md border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-amber-300">Popular</span></span><span className="mt-1 block text-xs text-slate-300">A smooth climb from Epic into Mythic rank</span></span></div>
      <div className="relative flex items-center justify-between gap-6 sm:justify-end"><span className="text-lg font-black text-white">{formatPrice(EPIC_TO_MYTHIC_PRICE, currency)}<span className="ml-1 text-[10px] font-medium text-slate-300">/ package</span></span><span className={`grid h-6 w-6 place-items-center rounded-md border transition ${selected ? 'border-amber-300 bg-amber-300 text-slate-950' : 'border-white/30 bg-slate-950 text-transparent'}`}><Check size={15} /></span></div>
    </button>
  )
}

function StarTierCard({ tier, count, currency, onChange }) {
  const Icon = tier.icon
  const selectedStyle = count ? 'border-white/25 bg-slate-900/95 shadow-lg' : 'border-white/[0.12] bg-slate-900/85 hover:border-white/20'
  return (
    <article className={`rounded-2xl border p-5 transition ${selectedStyle}`}>
      <div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl border ${TIER_TONES[tier.color]}`}><Icon size={19} /></span><span className={`rounded-md px-2 py-1 text-[8px] font-black tracking-[0.12em] ${TIER_TONES[tier.color]}`}>{tier.short}</span></div>
      <h3 className="mt-5 text-sm font-extrabold">{tier.name}</h3><p className="mt-1 text-[10px] text-slate-300">{tier.range}</p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-1"><p className="text-xl font-black">{formatPrice(tier.price, currency)}<span className="ml-1 text-[10px] font-medium text-slate-300">/ star</span></p><span className="text-[9px] text-slate-400">{tier.price} THB base</span></div>
      <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.1] bg-slate-950/85 p-1.5"><button type="button" aria-label={`Remove one ${tier.name} star`} disabled={!count} onClick={() => onChange(tier.id, -1)} className="grid h-11 w-11 place-items-center rounded-lg text-slate-300 transition hover:bg-white/[0.1] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><Minus size={16} /></button><span aria-live="polite" className={`min-w-10 text-center text-sm font-extrabold ${count ? 'text-white' : 'text-slate-400'}`}>{count}</span><button type="button" aria-label={`Add one ${tier.name} star`} onClick={() => onChange(tier.id, 1)} className="grid h-11 w-11 place-items-center rounded-lg bg-white/[0.08] text-slate-100 transition hover:bg-amber-300 hover:text-slate-950"><Plus size={16} /></button></div>
    </article>
  )
}

function OrderEstimate({ currency, total, totalStars, packageSelected, onOrder }) {
  const summary = [packageSelected && 'Epic to Mythic package', totalStars > 0 && `${totalStars} star${totalStars === 1 ? '' : 's'}`].filter(Boolean).join(' + ')
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-cyan-300/20 bg-slate-900/95 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">Your order estimate</p><p className="mt-1 text-xs text-slate-300">{summary || 'Select a package or add stars to begin'}</p></div><div className="flex items-center justify-between gap-5 sm:justify-end"><span className="text-2xl font-black tracking-tight text-white">{formatPrice(total, currency)}</span><button type="button" onClick={onOrder} disabled={!total} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">Order now <ArrowRight size={14} /></button></div></div>
  )
}
