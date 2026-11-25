import { Crown, ShieldCheck, Star, Trophy } from 'lucide-react'

export const THB_PER_USD = 34.5
export const MMK_PER_THB = 100_000 / 750
export const EXCHANGE_RATES = { THB: 1, USD: 1 / THB_PER_USD, MMK: MMK_PER_THB }
export const EPIC_TO_MYTHIC_PRICE = 400

export const PRICING_TIERS = [
  { id: 'star', name: 'Mythic Star', short: 'STAR', price: 10, color: 'amber', range: '1–24 stars', icon: Star },
  { id: 'honor', name: 'Honor Star', short: 'HONOR', price: 14, color: 'cyan', range: '25–49 stars', icon: ShieldCheck },
  { id: 'glory', name: 'Glory Star', short: 'GLORY', price: 15, color: 'violet', range: '50–99 stars', icon: Trophy },
  { id: 'immortal', name: 'Immortal Star', short: 'IMMORTAL', price: 18, color: 'rose', range: '100+ stars', icon: Crown },
]

export const FAQ_ITEMS = [
  { question: 'How does the boosting process work?', answer: 'Choose your package or star count, place your order, then message us through Telegram or Messenger. We’ll confirm your details and keep you updated as your rank progresses.' },
  { question: 'Is my account safe?', answer: 'Your account is handled by experienced players. We recommend enabling account protection and sharing only the login details needed to complete your order.' },
  { question: 'How long will my order take?', answer: 'Time depends on your current rank, target, and queue. We’ll provide an estimated completion window when confirming your order.' },
  { question: 'Can I play while my order is in progress?', answer: 'Please coordinate with your booster first. Playing at the same time can interrupt a session, so we’ll agree on a schedule that works for you.' },
]
