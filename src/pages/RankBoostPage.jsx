import { useMemo, useState } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import OrderModal from '../components/OrderModal'
import PricingSection from '../components/PricingSection'
import { FAQSection, HowItWorksSection } from '../components/InfoSections'
import { EPIC_TO_MYTHIC_PRICE, PRICING_TIERS, THB_PER_USD } from '../data/pricing'
import { formatPrice } from '../utils/currency'

const INITIAL_STARS = { star: 0, honor: 0, glory: 0, immortal: 0 }
const CURRENCIES = ['THB', 'MMK', 'USD']

export default function RankBoostPage() {
  const [currency, setCurrency] = useState('THB')
  const [packageSelected, setPackageSelected] = useState(false)
  const [stars, setStars] = useState(INITIAL_STARS)
  const [modalOpen, setModalOpen] = useState(false)
  const total = useMemo(() => (packageSelected ? EPIC_TO_MYTHIC_PRICE : 0) + PRICING_TIERS.reduce((sum, tier) => sum + tier.price * stars[tier.id], 0), [packageSelected, stars])

  function updateStars(tierId, delta) {
    setStars((current) => ({ ...current, [tierId]: Math.max(0, current[tierId] + delta) }))
  }

  return (
    <>
      <section className="border-b border-white/[0.08] bg-slate-900/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">Zenn’s MLBB service</p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">Rank <span className="text-amber-300">Boosting</span></h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Choose a rank package or build your climb star by star. Share any account details privately with Zenn on Telegram.</p>
            <a href="https://t.me/zennzenn2003" target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 text-[10px] font-bold text-emerald-200"><ShieldCheck size={14} /> Privacy &amp; Security 100% <span className="text-emerald-100/70">· @zennzenn2003</span></a>
          </div>
          <div className="flex w-fit rounded-xl border border-white/10 bg-slate-950 p-1" aria-label="Rank boost currency">
            {CURRENCIES.map((code) => <button key={code} type="button" aria-pressed={currency === code} onClick={() => setCurrency(code)} className={`min-h-10 rounded-lg px-3 text-[10px] font-extrabold transition sm:px-4 sm:text-xs ${currency === code ? 'bg-amber-300 text-slate-950' : 'text-slate-400 hover:text-white'}`}>{code}</button>)}
          </div>
        </div>
      </section>
      <p className="mx-auto max-w-7xl px-4 pt-5 text-[10px] text-slate-400 sm:px-6 lg:px-8">Rates: 100,000 Ks = 750 Baht · 1 USD ≈ {THB_PER_USD} Baht</p>
      <PricingSection currency={currency} packageSelected={packageSelected} onPackageToggle={() => setPackageSelected((selected) => !selected)} stars={stars} onStarChange={updateStars} total={total} onOrder={() => setModalOpen(true)} />
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8"><a href="https://t.me/zennzenn2003" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/[0.08] px-5 text-sm font-bold text-cyan-200 transition hover:bg-cyan-300/15">Chat directly with @zennzenn2003 <ArrowRight size={15} /></a></div>
      <HowItWorksSection /><FAQSection />
      {total > 0 && <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-4 pt-3 backdrop-blur-xl md:hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}><div className="mx-auto flex max-w-lg items-center justify-between gap-3"><div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-300">Order total</p><p className="truncate text-lg font-black text-amber-300">{formatPrice(total, currency)}</p></div><button type="button" onClick={() => setModalOpen(true)} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-xs font-extrabold text-slate-950">Review order <ArrowRight size={14} /></button></div></div>}
      {modalOpen && <OrderModal currency={currency} packageSelected={packageSelected} stars={stars} total={total} onClose={() => setModalOpen(false)} />}
    </>
  )
}
