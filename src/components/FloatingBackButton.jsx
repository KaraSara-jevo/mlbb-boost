import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Gem, House, MessageCircle, Plus, Trophy, X } from 'lucide-react'

const BUTTON_SIZE = 56
const EDGE_GAP = 14
const TELEGRAM_URL = 'https://t.me/zennzenn2003'

function readSafeAreaInsets() {
  const probe = document.createElement('div')
  probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
  document.body.appendChild(probe)
  const styles = window.getComputedStyle(probe)
  const insets = { top: parseFloat(styles.paddingTop) || 0, right: parseFloat(styles.paddingRight) || 0, bottom: parseFloat(styles.paddingBottom) || 0, left: parseFloat(styles.paddingLeft) || 0 }
  probe.remove()
  return insets
}

function clampPosition(x, y, insets = { top: 0, right: 0, bottom: 0, left: 0 }) {
  return {
    x: Math.max(insets.left + EDGE_GAP, Math.min(x, window.innerWidth - insets.right - BUTTON_SIZE - EDGE_GAP)),
    y: Math.max(insets.top + EDGE_GAP, Math.min(y, window.innerHeight - insets.bottom - BUTTON_SIZE - EDGE_GAP)),
  }
}

export default function FloatingBackButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const containerRef = useRef(null)
  const dragRef = useRef(null)
  const suppressClickUntil = useRef(0)
  const safeInsetsRef = useRef({ top: 0, right: 0, bottom: 0, left: 0 })
  const [position, setPosition] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    safeInsetsRef.current = readSafeAreaInsets()
    const frameId = window.requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) setPosition(clampPosition(rect.left, rect.top, safeInsetsRef.current))
    })
    return () => window.cancelAnimationFrame(frameId)
  }, [])

  useEffect(() => {
    function handleResize() {
      safeInsetsRef.current = readSafeAreaInsets()
      setPosition((current) => current ? clampPosition(current.x, current.y, safeInsetsRef.current) : current)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    function handleOutsidePointer(event) {
      if (!containerRef.current?.contains(event.target)) setMenuOpen(false)
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('pointerdown', handleOutsidePointer)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointer)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  function navigateBack() {
    setMenuOpen(false)
    const historyIndex = window.history.state?.idx ?? 0
    if (historyIndex > 0) navigate(-1)
    else if (location.pathname !== '/') navigate('/')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function navigateTo(path) {
    setMenuOpen(false)
    navigate(path)
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return
    const rect = event.currentTarget.getBoundingClientRect()
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, left: rect.left, top: rect.top, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const deltaX = event.clientX - drag.startX
    const deltaY = event.clientY - drag.startY
    if (!drag.moved && Math.hypot(deltaX, deltaY) > 6) drag.moved = true
    if (drag.moved) setPosition(clampPosition(drag.left + deltaX, drag.top + deltaY, safeInsetsRef.current))
  }

  function handlePointerUp(event) {
    if (dragRef.current?.pointerId !== event.pointerId) return
    if (dragRef.current.moved) suppressClickUntil.current = Date.now() + 350
    dragRef.current = null
  }

  function handlePrimaryClick() {
    if (Date.now() < suppressClickUntil.current) return
    navigateBack()
  }

  const viewportWidth = typeof window === 'undefined' ? 1024 : window.innerWidth
  const viewportHeight = typeof window === 'undefined' ? 800 : window.innerHeight
  const isNearTop = (position?.y ?? viewportHeight - 150) < 250
  const isNearLeft = (position?.x ?? viewportWidth - 70) < 240
  const positionStyle = position
    ? { left: `${position.x}px`, top: `${position.y}px` }
    : { right: 'calc(env(safe-area-inset-right, 0px) + 18px)', bottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }

  return (
    <div ref={containerRef} className="pointer-events-none fixed z-[70] h-14 w-14" style={positionStyle}>
      {menuOpen && <nav aria-label="Quick navigation" className={`pointer-events-auto absolute w-56 rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-[0_12px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl ${isNearTop ? 'top-full mt-3' : 'bottom-full mb-3'} ${isNearLeft ? 'left-0' : 'right-0'}`}>
        <QuickAction icon={ArrowLeft} label="Back" onClick={navigateBack} />
        <QuickAction icon={House} label="Home" onClick={() => navigateTo('/')} />
        <QuickAction icon={Gem} label="Diamonds" onClick={() => navigateTo('/diamonds')} />
        <QuickAction icon={Trophy} label="Rank Boost" onClick={() => navigateTo('/rank-boost')} />
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.07]" onClick={() => setMenuOpen(false)}><MessageCircle size={16} className="text-cyan-300" />Telegram · @zennzenn2003</a>
      </nav>}

      <button type="button" aria-label={location.pathname === '/' ? 'Back or scroll to top' : 'Go back'} title="Drag to move · tap to go back" onClick={handlePrimaryClick} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} className="pointer-events-auto grid h-14 w-14 touch-none select-none place-items-center rounded-full border border-white/20 bg-slate-800/75 text-amber-200 shadow-[0_0_26px_rgba(34,211,238,0.16)] backdrop-blur-xl transition hover:border-cyan-300/50 hover:bg-slate-800/95 active:scale-95">
        <ArrowLeft size={23} strokeWidth={2.5} />
      </button>
      <button type="button" aria-label={menuOpen ? 'Close quick navigation' : 'Open quick navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="pointer-events-auto absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full border border-slate-950 bg-cyan-300 text-slate-950 shadow-lg transition hover:bg-cyan-200">{menuOpen ? <X size={13} /> : <Plus size={13} />}</button>
    </div>
  )
}

function QuickAction({ icon: Icon, label, onClick }) {
  return <button type="button" onClick={onClick} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-xs font-semibold text-slate-200 transition hover:bg-white/[0.07]"><Icon size={16} className="text-cyan-300" />{label}</button>
}
