import { EXCHANGE_RATES } from '../data/pricing'

export function formatPrice(thbAmount, currency) {
  const converted = thbAmount * EXCHANGE_RATES[currency]
  if (currency === 'THB') return `${Math.round(converted).toLocaleString('en-US')} Baht`
  if (currency === 'USD') return `$${converted.toFixed(2)}`
  return `${Math.round(converted).toLocaleString('en-US')} Ks`
}
