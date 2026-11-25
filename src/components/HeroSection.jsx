import { ArrowRight, ArrowUpRight, Clock3, Crown, Gamepad2, Gem, ShieldCheck, Sparkles, Star, Trophy, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const heroBackgroundImage = `${import.meta.env.BASE_URL}image.png`

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, rgba(2, 6, 23, 0.44) 0%, rgba(2, 6, 23, 0.5) 48%, rgba(2, 6, 23, 0.78) 100%), url('${heroBackgroundImage}')` }} />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.19em] text-cyan-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" /> Season 39 · Now boosting</div>
          <h1 className="max-w-2xl text-[2.65rem] font-black leading-[0.98] tracking-[-0.055em] min-[380px]:text-5xl sm:text-6xl lg:text-[4.45rem]">Zenn’s MLBB<br /><span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">game services.</span></h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">Top up Diamonds or boost your rank with Zenn. Choose a service and order privately through Telegram.</p>
          <div className="mt-8 flex flex-col gap-3 min-[380px]:flex-row"><Link to="/diamonds" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3.5 text-xs font-extrabold text-slate-950 shadow-[0_8px_32px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5 hover:bg-cyan-200"><Gem size={16} /> Buy Diamonds <ArrowRight size={15} className="transition group-hover:translate-x-0.5" /></Link><Link to="/rank-boost" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-300/30 bg-amber-300/[0.07] px-5 py-3.5 text-xs font-bold text-amber-200 transition hover:border-amber-300/60 hover:bg-amber-300/10"><Trophy size={15} /> Rank Boost <ArrowRight size={15} /></Link></div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[0.12] pt-6 text-[11px] font-medium text-slate-300"><span className="flex items-center gap-2"><ShieldCheck size={14} className="text-cyan-300" /> Account mindful</span><span className="flex items-center gap-2"><Clock3 size={14} className="text-cyan-300" /> Flexible schedule</span><span className="flex items-center gap-2"><Zap size={14} className="text-cyan-300" /> Fast delivery</span></div>
        </div>
        <RankProgressCard />
      </div>
    </section>
  )
}

function RankProgressCard() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
      <div className="absolute -inset-8 rounded-full bg-cyan-400/[0.08] blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-md sm:p-7">
        <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.22em] text-slate-300">RANK PROGRESSION</span><span className="flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300"><span className="h-1 w-1 rounded-full bg-emerald-300" /> Live</span></div>
        <div className="mt-8 flex items-center justify-between gap-1 min-[380px]:gap-2 sm:gap-4">
          <RankBadge label="EPIC" title="Current rank" icon={ShieldCheck} />
          <div className="mb-5 flex min-w-0 flex-1 flex-col items-center"><span className="mb-2 text-[7px] font-bold tracking-[0.1em] text-amber-300 min-[380px]:text-[8px]">YOUR CLIMB</span><div className="flex w-full items-center"><div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-amber-300/70" /><span className="mx-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-amber-300/25 bg-amber-300/10 text-amber-300 min-[380px]:mx-2 min-[380px]:h-8 min-[380px]:w-8"><ArrowRight size={15} /></span><div className="h-px flex-1 bg-gradient-to-r from-amber-300/70 to-amber-300" /></div></div>
          <RankBadge label="MYTHIC" title="Target rank" icon={Crown} target />
        </div>
        <div className="mt-9 rounded-2xl border border-white/[0.07] bg-slate-950/90 p-4 sm:p-5"><div className="flex items-end justify-between gap-2"><div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-300">The next milestone</p><p className="mt-1.5 text-lg font-extrabold">Mythical Glory <span className="text-xs font-semibold text-slate-400">· 50 stars</span></p></div><span className="shrink-0 text-xs font-bold text-cyan-300">Let’s go <ArrowUpRight size={13} className="ml-1 inline" /></span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.1]"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-400 to-amber-300 shadow-[0_0_12px_rgba(34,211,238,0.45)]" /></div><div className="mt-2 flex justify-between text-[9px] font-medium text-slate-300"><span>Epic I</span><span>Mythic placement →</span></div></div>
        <div className="mt-5 flex items-center justify-between px-1"><div className="flex -space-x-2">{['bg-cyan-300', 'bg-amber-300', 'bg-violet-300', 'bg-rose-300'].map((color, i) => <span key={color} className={`grid h-7 w-7 place-items-center rounded-full border-2 border-slate-900 ${color} text-[8px] font-black text-slate-950`}>{['J', 'M', 'K', 'A'][i]}</span>)}</div><span className="text-[9px] text-slate-300">Players climbing right now</span><span className="text-[10px] font-bold text-white">24 <span className="text-slate-400">/ 30</span></span></div>
      </div>
      <div className="absolute -bottom-4 -left-3 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-slate-900 px-3.5 py-3 shadow-xl sm:flex"><span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-300/10 text-amber-300"><Sparkles size={16} /></span><span><span className="block text-[10px] font-bold">Skilled boosters</span><span className="mt-0.5 block text-[9px] text-slate-300">Ready for your next match</span></span></div>
    </div>
  )
}

function RankBadge({ label, title, icon: Icon, target = false }) {
  const boxStyle = target ? 'border-amber-300/35 bg-gradient-to-br from-amber-300/20 to-orange-500/10 text-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.1)]' : 'border-slate-600 bg-gradient-to-br from-slate-700 to-slate-900 text-slate-200 shadow-lg'
  const labelStyle = target ? 'text-amber-300' : 'text-slate-300'
  return <div className="min-w-0 text-center"><div className={`relative mx-auto grid h-[68px] w-[68px] place-items-center rounded-2xl border sm:h-24 sm:w-24 ${boxStyle}`}><Icon size={36} /><span className={`absolute -bottom-2 rounded bg-slate-950 px-2 py-0.5 text-[8px] font-black tracking-widest ${labelStyle}`}>{label}</span></div><p className="mt-5 text-[10px] font-semibold text-slate-300">{title}</p></div>
}

export function TrustBar() {
  const features = [
    { title: 'MLBB specialists', detail: 'Ranked climb experts', icon: Gamepad2, tone: 'text-cyan-300' },
    { title: 'Private & secure', detail: 'Your account matters', icon: ShieldCheck, tone: 'text-cyan-300' },
    { title: 'On your time', detail: 'Flexible scheduling', icon: Clock3, tone: 'text-amber-300' },
    { title: 'Clear pricing', detail: 'No surprise add-ons', icon: Star, tone: 'text-amber-300' },
  ]
  return <section className="border-y border-white/[0.1] bg-slate-950/75 backdrop-blur-sm"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-7 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">{features.map(({ title, detail, icon: Icon, tone }) => <div key={title} className="flex items-center gap-3"><Icon className={tone} size={19} /><span><b className="block text-sm">{title}</b><small className="text-[10px] text-slate-300">{detail}</small></span></div>)}</div></section>
}
