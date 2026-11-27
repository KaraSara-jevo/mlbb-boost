import { useState } from 'react'
import { ArrowRight, Check, ChevronDown, Crown, Minus, Plus } from 'lucide-react'
import { CURRENT_RANKS, PRICING_TIERS } from '../data/pricing'
import { EPIC_TO_MYTHIC_PRICE } from '../data/pricing'
import { formatPrice } from '../utils/currency'

const TIER_TONES = {
  amber: 'text-amber-300 bg-amber-300/10 border-amber-300/15',
  cyan: 'text-cyan-300 bg-cyan-300/10 border-cyan-300/15',
  violet: 'text-violet-300 bg-violet-300/10 border-violet-300/15',
  rose: 'text-rose-300 bg-rose-300/10 border-rose-300/15',
}

export function PricingSection({ currency, currentRankId, currentStars, currentStarInput, onCurrentRankChange, onCurrentStarsChange, onCurrentStarsBlur, packageSelected, onPackageToggle, stars, onStarChange, total, onOrder }) {
  const [showAllRanks, setShowAllRanks] = useState(false)
  const totalStars = Object.values(stars).reduce((sum, count) => sum + count, 0)
  const selectedRank = CURRENT_RANKS.find(({ id }) => id === currentRankId)
  const showAll = !selectedRank || showAllRanks
  const visibleTiers = showAll ? PRICING_TIERS : PRICING_TIERS.filter(({ id }) => id === selectedRank.tierId)
  return (
    <section id="rank-boost" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end"><div><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">01 / Choose your climb</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Find your next <span className="text-amber-300">rank.</span></h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">Pick a quick package or build your own climb star by star. Your total updates as you go.</p></div><div className="flex items-center gap-2 text-[10px] font-medium text-slate-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Prices shown in <b className="text-white">{currency}</b></div></div>

      <CurrentRankSelector selectedId={currentRankId} currentStars={currentStars} currentStarInput={currentStarInput} onChange={(rankId) => { onCurrentRankChange(rankId); setShowAllRanks(false) }} onStarsChange={onCurrentStarsChange} onStarsBlur={onCurrentStarsBlur} />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">Step 2</span><h3 className="mt-1 text-base font-extrabold">Select Your Boost Option / Stars</h3><p className="mt-1 text-xs text-slate-300">{selectedRank ? `Showing options for ${selectedRank.name}.` : 'Choose a current rank to see its matching boost option.'}</p></div>{selectedRank && <button type="button" aria-expanded={showAllRanks} onClick={() => setShowAllRanks((expanded) => !expanded)} className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/10 bg-white/[0.04] px-3 text-[10px] font-bold text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100 sm:self-auto">{showAllRanks ? 'Show selected rank only' : 'Show all ranks'}<ChevronDown size={13} className={`transition-transform ${showAllRanks ? 'rotate-180' : ''}`} /></button>}</div>
      {showAll || currentRankId === 'epic' ? <PackageCard selected={packageSelected} highlighted={currentRankId === 'epic'} currency={currency} onToggle={onPackageToggle} /> : null}
      <div className={`grid gap-4 ${showAll ? 'sm:grid-cols-2 xl:grid-cols-4' : 'max-w-xl grid-cols-1'}`}>{visibleTiers.map((tier) => <StarTierCard key={tier.id} tier={tier} count={stars[tier.id]} highlighted={selectedRank?.tierId === tier.id} currency={currency} onChange={onStarChange} />)}</div>
      <OrderEstimate currency={currency} currentRank={selectedRank?.name} currentStars={currentStars} total={total} stars={stars} packageSelected={packageSelected} onOrder={onOrder} />
    </section>
  )
}

function CurrentRankSelector({ selectedId, currentStars, currentStarInput, onChange, onStarsChange, onStarsBlur }) {
  const selectedRank = CURRENT_RANKS.find(({ id }) => id === selectedId)
  return (
    <div className="mb-6 rounded-2xl border border-cyan-300/20 bg-slate-900/85 p-5 sm:p-6">
      <div className="mb-4"><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">Step 1</span><h3 className="mt-1 text-base font-extrabold">Your Current Rank &amp; Stars</h3><p className="mt-1 text-xs text-slate-300">Choose your current rank and star count to highlight the matching boost option.</p></div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{CURRENT_RANKS.map(({ id, name, image, fallbackImage }) => <button key={id} type="button" aria-pressed={selectedId === id} onClick={() => onChange(id)} className={`flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border px-3 py-3 text-center text-xs font-bold transition ${selectedId === id ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.1)]' : 'border-white/10 bg-slate-950/70 text-slate-300 hover:border-cyan-300/30 hover:text-white'}`}>
        <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950/70 p-1"><img src={`${import.meta.env.BASE_URL}${image}`} alt="" aria-hidden="true" onError={(event) => { const logo = event.currentTarget; if (fallbackImage && !logo.dataset.fallbackApplied) { logo.dataset.fallbackApplied = 'true'; logo.src = `${import.meta.env.BASE_URL}${fallbackImage}` } else { logo.style.visibility = 'hidden' } }} className="h-full w-full object-contain mix-blend-screen" /></span>
        <span>{name}</span>
      </button>)}</div>
      {selectedRank?.currentMin != null && <label className="mt-4 block max-w-xs text-xs font-semibold text-slate-200">Current Stars <span className="ml-1 font-normal text-slate-400">({selectedRank.currentMin}–{selectedRank.currentMax === Infinity ? '∞' : selectedRank.currentMax})</span><input type="number" inputMode="numeric" min={selectedRank.currentMin} max={selectedRank.currentMax === Infinity ? undefined : selectedRank.currentMax} step="1" value={currentStarInput} onChange={(event) => onStarsChange(event.target.value)} onBlur={onStarsBlur} aria-label={`Current stars for ${selectedRank.name}`} className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300/60" /></label>}
      {selectedId === 'epic' && <p className="mt-4 text-xs text-slate-300">Epic uses divisions instead of a Mythic star count. The Epic to Mythic package is highlighted below.</p>}
    </div>
  )
}

function PackageCard({ selected, highlighted, currency, onToggle }) {
  const cardStyle = selected ? 'border-amber-300/60 bg-slate-900/95 shadow-[0_0_36px_rgba(251,191,36,0.07)]' : highlighted ? 'border-cyan-300/50 bg-slate-900/95 shadow-[0_0_36px_rgba(34,211,238,0.07)]' : 'border-white/15 bg-slate-900/85 hover:border-amber-300/30'
  return (
    <button type="button" onClick={onToggle} aria-pressed={selected} className={`group relative mb-6 flex w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border p-5 text-left transition sm:flex-row sm:items-center sm:p-6 ${cardStyle}`}>
      <div className="absolute right-0 top-0 h-32 w-48 bg-amber-300/[0.06] blur-3xl" />
      <div className="relative flex items-center gap-4"><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition ${selected ? 'border-amber-300/30 bg-amber-300/15 text-amber-300' : 'border-white/10 bg-white/[0.04] text-slate-300 group-hover:text-amber-300'}`}><Crown size={23} /></span><span><span className="flex flex-wrap items-center gap-2 text-sm font-extrabold sm:text-base">Epic to Mythic Package <span className="rounded-md border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-amber-300">Popular</span>{highlighted && <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-cyan-200">Current rank</span>}</span><span className="mt-1 block text-xs text-slate-300">A smooth climb from Epic into Mythic rank</span></span></div>
      <div className="relative flex items-center justify-between gap-6 sm:justify-end"><span className="text-lg font-black text-white">{formatPrice(EPIC_TO_MYTHIC_PRICE, currency)}<span className="ml-1 text-[10px] font-medium text-slate-300">/ package</span></span><span className={`grid h-6 w-6 place-items-center rounded-md border transition ${selected ? 'border-amber-300 bg-amber-300 text-slate-950' : 'border-white/30 bg-slate-950 text-transparent'}`}><Check size={15} /></span></div>
    </button>
  )
}

function StarTierCard({ tier, count, highlighted, currency, onChange }) {
  const selectedStyle = count ? 'border-white/25 bg-slate-900/95 shadow-lg' : highlighted ? 'border-cyan-300/50 bg-slate-900/95 shadow-[0_0_36px_rgba(34,211,238,0.07)]' : 'border-white/[0.12] bg-slate-900/85 hover:border-white/20'
  return (
    <article className={`rounded-2xl border p-5 transition ${selectedStyle}`}>
      <div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl border ${TIER_TONES[tier.color]}`}><img src={`${import.meta.env.BASE_URL}${tier.image}`} alt="" aria-hidden="true" className="h-8 w-8 object-contain" /></span><span className={`rounded-md px-2 py-1 text-[8px] font-black tracking-[0.12em] ${TIER_TONES[tier.color]}`}>{tier.short}</span></div>
      <h3 className="mt-5 flex items-center gap-2 text-sm font-extrabold">{tier.name}{highlighted && <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-cyan-200">Current rank</span>}</h3><p className="mt-1 text-[10px] text-slate-300">{tier.range}</p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-1"><p className="text-xl font-black">{formatPrice(tier.price, currency)}<span className="ml-1 text-[10px] font-medium text-slate-300">/ star</span></p><span className="text-[9px] text-slate-400">{tier.price} THB base</span></div>
      <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.1] bg-slate-950/85 p-1.5"><button type="button" aria-label={`Remove one ${tier.name} star`} disabled={!count} onClick={() => onChange(tier.id, -1)} className="grid h-11 w-11 place-items-center rounded-lg text-slate-300 transition hover:bg-white/[0.1] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><Minus size={16} /></button><span aria-live="polite" className={`min-w-10 text-center text-sm font-extrabold ${count ? 'text-white' : 'text-slate-400'}`}>{count}</span><button type="button" aria-label={`Add one ${tier.name} star`} disabled={count >= tier.max} onClick={() => onChange(tier.id, 1)} className="grid h-11 w-11 place-items-center rounded-lg bg-white/[0.08] text-slate-100 transition hover:bg-amber-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"><Plus size={16} /></button></div>
    </article>
  )
}

function OrderEstimate({ currency, currentRank, currentStars, total, stars, packageSelected, onOrder }) {
  const boostSummary = PRICING_TIERS.filter(({ id }) => stars[id] > 0).map(({ name, id }) => `${name}: +${stars[id]} Stars`).join(' · ')
  const summary = [packageSelected && 'Epic to Mythic package', boostSummary].filter(Boolean).join(' · ')
  const canOrder = total > 0 && currentRank && (currentRank === 'Epic' || currentStars != null)
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-cyan-300/20 bg-slate-900/95 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">Your order estimate</p><p className="mt-1 text-xs text-slate-300">Current: {currentRank || 'Select your current rank'}{currentRank && currentRank !== 'Epic' && currentStars != null ? ` (${currentStars} ★)` : ''}{summary && ` → ${summary}`}</p></div><div className="flex items-center justify-between gap-5 sm:justify-end"><span className="text-2xl font-black tracking-tight text-white">{formatPrice(total, currency)}</span><button type="button" onClick={onOrder} disabled={!canOrder} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">Order now <ArrowRight size={14} /></button></div></div>
  )
}
