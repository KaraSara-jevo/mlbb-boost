import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Menu, MessageCircle, Swords, X } from 'lucide-react'

const TELEGRAM_URL = 'https://t.me/zennzenn2003'
const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/diamonds', label: 'Buy Diamonds' },
  { to: '/rank-boost', label: 'Rank Boost' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const desktopNavClass = ({ isActive }) => `rounded-xl px-4 py-2.5 text-xs font-bold transition ${isActive ? 'border border-cyan-300/20 bg-cyan-300/10 text-cyan-100' : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white'}`
  const drawerNavClass = ({ isActive }) => `flex min-h-12 items-center rounded-xl border px-4 text-sm font-semibold transition ${isActive ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[inset_3px_0_0_rgba(103,232,249,0.8)]' : 'border-transparent text-slate-200 hover:border-white/10 hover:bg-white/[0.06]'}`

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  function closeDrawer() {
    setMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/15 bg-slate-900/65 shadow-[0_8px_32px_rgba(2,6,23,0.18)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Nexus home" onClick={closeDrawer}>
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-amber-300/30 bg-amber-300/10 text-amber-300"><Swords size={19} /></span>
            <span><span className="block text-sm font-black tracking-[0.18em]">NEXUS<span className="text-amber-300">.</span></span><span className="hidden text-[9px] font-medium tracking-wide text-slate-300 sm:block">Zenn’s MLBB</span></span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-slate-950/25 p-1.5 md:flex" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={desktopNavClass}>{item.label}</NavLink>)}
          </nav>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-100 transition hover:border-cyan-300/30 hover:bg-white/[0.1] md:hidden" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation-drawer" onClick={() => setMenuOpen(true)}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      <button type="button" tabIndex={menuOpen ? 0 : -1} aria-label="Close navigation menu" aria-hidden={!menuOpen} onClick={closeDrawer} className={`fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none md:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />

      <aside id="mobile-navigation-drawer" aria-label="Mobile navigation" aria-hidden={!menuOpen} inert={!menuOpen} className={`fixed inset-y-0 right-0 z-[80] flex w-[min(88vw,360px)] flex-col border-l border-white/15 bg-slate-900/75 shadow-[-24px_0_80px_rgba(2,6,23,0.55)] backdrop-blur-2xl transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${menuOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-5 pb-5 pt-[max(env(safe-area-inset-top),1.25rem)]">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-300/30 bg-amber-300/10 text-amber-300"><Swords size={21} /></span><div><p className="text-sm font-black tracking-[0.18em]">NEXUS<span className="text-amber-300">.</span></p><p className="mt-1 text-[10px] font-medium tracking-wide text-slate-300">Zenn’s MLBB</p></div></div>
          <button ref={closeButtonRef} type="button" aria-label="Close navigation" onClick={closeDrawer} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-200 transition hover:border-rose-300/30 hover:bg-rose-300/10 hover:text-white"><X size={20} /></button>
        </div>

        <div className="px-5 pt-7"><p className="px-2 text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300">Navigate</p><nav className="mt-3 flex flex-col gap-2" aria-label="Mobile navigation links">{NAV_ITEMS.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={drawerNavClass} onClick={closeDrawer}>{item.label}</NavLink>)}</nav></div>

        <div className="mt-auto border-t border-white/10 p-5" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" onClick={closeDrawer} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 text-sm font-bold text-cyan-100 shadow-[0_8px_28px_rgba(34,211,238,0.08)] transition hover:border-cyan-200/50 hover:bg-cyan-300/15"><MessageCircle size={17} /> Telegram <span className="text-cyan-200/80">@zennzenn2003</span><ArrowUpRight size={15} className="ml-auto" /></a>
          <p className="mt-4 text-center text-[9px] font-medium text-slate-400">Private orders · Direct chat with Zenn</p>
        </div>
      </aside>
    </>
  )
}
