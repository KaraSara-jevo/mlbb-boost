export const THB_PER_USD = 34.5
export const MMK_PER_THB = 100_000 / 750
export const EXCHANGE_RATES = { THB: 1, USD: 1 / THB_PER_USD, MMK: MMK_PER_THB }
export const EPIC_TO_MYTHIC_PRICE = 400

export const CURRENT_RANKS = [
  { id: 'epic', name: 'Epic', tierId: null, currentMin: null, currentMax: null, image: 'Epic-logo.png', fallbackImage: 'Epic.jpg' },
  { id: 'mythic', name: 'Mythic', tierId: 'star', currentMin: 0, currentMax: 24, image: 'Mythic-logo.png', fallbackImage: 'Rank-Mythic.png' },
  { id: 'honor', name: 'Mythical Honor', tierId: 'honor', currentMin: 25, currentMax: 49, image: 'Rank-Honor.png', fallbackImage: 'Honor.jpg' },
  { id: 'glory', name: 'Mythical Glory', tierId: 'glory', currentMin: 50, currentMax: 99, image: 'Rank-Glory.png', fallbackImage: 'Glory.jpg' },
  { id: 'immortal', name: 'Mythical Immortal', tierId: 'immortal', currentMin: 100, currentMax: Infinity, image: 'Rank-Immortal.png', fallbackImage: 'Immortal.jpg' },
]

export const PRICING_TIERS = [
  { id: 'star', name: 'Mythic Star', short: 'STAR', price: 8, color: 'amber', range: '1–25 stars', min: 1, max: 25, image: 'Rank-Mythic.png' },
  { id: 'honor', name: 'Honor Star', short: 'HONOR', price: 12, color: 'cyan', range: '25–49 stars', min: 25, max: 49, image: 'Rank-Honor.png' },
  { id: 'glory', name: 'Glory Star', short: 'GLORY', price: 14, color: 'violet', range: '50–99 stars', min: 50, max: 99, image: 'Rank-Glory.png' },
  { id: 'immortal', name: 'Immortal Star', short: 'IMMORTAL', price: 18, color: 'rose', range: '100+ stars', min: 100, max: Infinity, image: 'Rank-Immortal.png' },
]

export const FAQ_ITEMS = [
  { question: 'How does the boosting process work?', answer: 'Choose your package or star count, place your order, then message us through Telegram or Messenger. We’ll confirm your details and keep you updated as your rank progresses.' },
  { question: 'Is my account safe?', answer: 'Your account is handled by experienced players. We recommend enabling account protection and sharing only the login details needed to complete your order.' },
  { question: 'How long will my order take?', answer: 'Time depends on your current rank, target, and queue. We’ll provide an estimated completion window when confirming your order.' },
  { question: 'Can I play while my order is in progress?', answer: 'Please coordinate with your booster first. Playing at the same time can interrupt a session, so we’ll agree on a schedule that works for you.' },
]
