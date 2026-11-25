import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, CircleHelp, Gamepad2, Swords, Trophy } from 'lucide-react'
import { FAQ_ITEMS } from '../data/pricing'

export function HowItWorksSection() {
  const steps = [
    { number: '01', title: 'Build your order', description: 'Choose the package or star count that matches your goal. Your price updates instantly.', icon: Gamepad2 },
    { number: '02', title: 'Send your request', description: 'Copy your order or message us directly. We’ll confirm your details and schedule.', icon: ArrowUpRight },
    { number: '03', title: 'Enjoy the climb', description: 'Your booster gets to work. Follow your progress and celebrate your new rank.', icon: Trophy },
  ]
  return (
    <section id="how-it-works" className="scroll-mt-24 border-y border-white/[0.1] bg-slate-950/75 backdrop-blur-sm"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"><SectionHeading eyebrow="02 / Simple & straightforward" title={<>Three steps to <span className="text-amber-300">victory.</span></>} /><div className="grid gap-4 md:grid-cols-3">{steps.map(({ number, title, description, icon: Icon }) => <article key={number} className="relative rounded-2xl border border-white/[0.12] bg-slate-900/90 p-6"><span className="absolute right-5 top-5 text-[10px] font-black tracking-widest text-slate-400">{number}</span><span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-300"><Icon size={20} /></span><h3 className="mt-5 text-sm font-extrabold">{title}</h3><p className="mt-2 max-w-xs text-xs leading-6 text-slate-300">{description}</p></article>)}</div></div></section>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:py-28"><div className="mb-8 text-center"><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">03 / Need to know</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Frequently asked <span className="text-amber-300">questions.</span></h2></div><div className="space-y-3">{FAQ_ITEMS.map(({ question, answer }, index) => <article key={question} className="overflow-hidden rounded-2xl border border-white/[0.12] bg-slate-900/90"><button type="button" aria-expanded={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"><span className="flex items-center gap-3 text-xs font-bold sm:text-sm"><CircleHelp className="shrink-0 text-cyan-300" size={17} />{question}</span><ChevronDown size={16} className={`shrink-0 text-slate-300 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} /></button>{openIndex === index && <p className="border-t border-white/[0.1] px-5 pb-5 pt-4 pl-12 text-xs leading-6 text-slate-200">{answer}</p>}</article>)}</div></section>
  )
}

function SectionHeading({ eyebrow, title }) {
  return <div className="mb-10"><span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2></div>
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.1] bg-slate-950"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><Link to="/" className="flex items-center gap-2 text-xs font-black tracking-[0.18em]"><span className="grid h-7 w-7 place-items-center rounded-lg border border-amber-300/20 bg-amber-300/10 text-amber-300"><Swords size={14} /></span>NEXUS<span className="text-amber-300">.</span></Link><p className="text-[10px] text-slate-300">Fan-made service. Mobile Legends: Bang Bang is a trademark of its respective owner.</p><Link to="/" className="text-[10px] font-semibold text-slate-300 transition hover:text-white">Back to home ↑</Link></div></footer>
  )
}
