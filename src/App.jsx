import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import FloatingBackButton from './components/FloatingBackButton'
import ScrollToTop from './components/ScrollToTop'
import { SiteFooter } from './components/InfoSections'
import HomePage from './pages/HomePage'
import DiamondsPage from './pages/DiamondsPage'
import RankBoostPage from './pages/RankBoostPage'

function AppRoutes() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-amber-300 selection:text-slate-950">
      <ScrollToTop />
      <SiteHeader />
      <main className="relative z-10"><Routes><Route path="/" element={<HomePage />} /><Route path="/diamonds" element={<DiamondsPage />} /><Route path="/rank-boost" element={<RankBoostPage />} /><Route path="*" element={<NotFound />} /></Routes></main>
      <SiteFooter />
      <FloatingBackButton />
    </div>
  )
}

function NotFound() {
  return <section className="mx-auto max-w-2xl px-4 py-28 text-center"><p className="text-sm font-bold uppercase tracking-widest text-cyan-300">404</p><h1 className="mt-3 text-3xl font-black">Page not found</h1><Link className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-amber-300 px-5 text-sm font-bold text-slate-950" to="/">Back home</Link></section>
}

export default function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL}><AppRoutes /></BrowserRouter>
}
