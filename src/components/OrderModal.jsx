import { useState } from 'react'
import { ArrowUpRight, Check, Copy, X } from 'lucide-react'
import { EPIC_TO_MYTHIC_PRICE, PRICING_TIERS } from '../data/pricing'
import { formatPrice } from '../utils/currency'

const TELEGRAM_URL = 'https://t.me/zennzenn2003'

export default function OrderModal({ currency, currentRank, currentStars, packageSelected, stars, total, onClose }) {
  const [copied, setCopied] = useState(false)
  const orderLines = [
    ...(packageSelected ? [`• Epic to Mythic package — ${formatPrice(EPIC_TO_MYTHIC_PRICE, currency)}`] : []),
    ...PRICING_TIERS.filter(({ id }) => stars[id] > 0).map(({ id, name, price }) => `• ${name} — ${stars[id]} star${stars[id] === 1 ? '' : 's'} × ${formatPrice(price, currency)}`),
  ]
  const currentRankLine = `Current Rank: ${currentRank}${currentRank !== 'Epic' && currentStars != null ? ` (${currentStars} ★)` : ''}`
  const orderText = [`Hi Zenn, I’d like to book an MLBB rank boost.`, currentRankLine, ...orderLines, `Total: ${formatPrice(total, currency)}`, `Currency: ${currency}`].join('\n')
  const telegramUrl = `${TELEGRAM_URL}?text=${encodeURIComponent(orderText)}`

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(orderText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = orderText
      textArea.setAttribute('readonly', '')
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      const copySucceeded = document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(copySucceeded)
      if (copySucceeded) window.setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/85 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section role="dialog" aria-modal="true" aria-labelledby="order-title" className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-slate-900 p-5 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between"><div><span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">Private Telegram checkout</span><h2 id="order-title" className="mt-2 text-2xl font-black">Your boost <span className="text-amber-300">summary.</span></h2></div><button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white" aria-label="Close order summary"><X size={17} /></button></div>
        <div className="mt-6 space-y-3 rounded-2xl border border-white/[0.1] bg-slate-950/85 p-4"><p className="mb-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-300">Selected services</p><OrderLine name="Current" value={currentRank !== 'Epic' && currentStars != null ? `${currentRank} (${currentStars} ★)` : currentRank} />{packageSelected && <OrderLine name="Epic to Mythic package" value={formatPrice(EPIC_TO_MYTHIC_PRICE, currency)} />}{PRICING_TIERS.filter(({ id }) => stars[id] > 0).map(({ id, name, price }) => <OrderLine key={id} name={`${name} · +${stars[id]} stars to add`} value={formatPrice(price * stars[id], currency)} />)}<div className="mt-3 flex items-center justify-between border-t border-white/[0.12] pt-4"><span className="text-xs font-bold text-slate-300">Total</span><span className="text-xl font-black text-amber-300">{formatPrice(total, currency)}</span></div></div>
        <p className="mt-4 text-[10px] leading-5 text-slate-300">No account details are collected here. Share any necessary information privately in Telegram.</p>
        <button type="button" onClick={handleCopy} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] py-3 text-xs font-bold transition hover:bg-white/[0.1]">{copied ? <Check size={15} className="text-emerald-300" /> : <Copy size={15} />} {copied ? 'Copied to clipboard' : 'Copy order'}</button>
        <a href={telegramUrl} target="_blank" rel="noreferrer" className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-3 py-3 text-xs font-extrabold text-white transition hover:bg-sky-400"><ArrowUpRight size={15} /> Book on Telegram</a>
      </section>
    </div>
  )
}

function OrderLine({ name, value }) {
  return <div className="flex justify-between gap-4 text-xs"><span className="text-slate-200">{name}</span><span className="shrink-0 font-bold text-white">{value}</span></div>
}
