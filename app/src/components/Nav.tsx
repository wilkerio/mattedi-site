import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Arrow } from './ui';
import { useCart } from './cart';

export const IG_URL = 'https://instagram.com/azeitemattedi';
export const WA_NUMBER = '5555999769531';
export const WA_LABEL = '(55) 99976-9531';
export const BUY_MSG = 'Olá! Gostaria de adquirir os azeites Mattedi da Safra 2026.';
export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const LINKS = [
  { id: 'historia', label: 'Nossa história' },
  { id: 'cultivo', label: 'O cultivo' },
  { id: 'azeites', label: 'Os azeites' },
  { id: 'onde', label: 'Onde comprar' },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { count, setOpen: openCart } = useCart();

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (es) => { const v = es.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (v) setActive(v.target.id); },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  useEffect(() => { document.documentElement.classList.toggle('lenis-stopped', open); return () => document.documentElement.classList.remove('lenis-stopped'); }, [open]);

  return (
    <>
      <header className="nav" data-solid={solid || open}>
        <div className="nav-in">
          <a href="#topo" className="mark" aria-label="Mattedi, início" onClick={() => setOpen(false)}><img src="/brand/logo-horizontal-ouro.png" alt="Mattedi" width="1300" height="190" /></a>
          <nav className="nav-links mono" aria-label="Seções">
            {LINKS.map((l) => <a key={l.id} href={'#' + l.id} aria-current={active === l.id}>{l.label}</a>)}
          </nav>
          <div className="nav-right">
            <button className="nav-cart" onClick={() => openCart(true)} aria-label={count ? `Abrir o pedido, ${count} ${count === 1 ? 'frasco' : 'frascos'}` : 'Abrir o pedido'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5.2 8.6h13.6l.9 10.6a1.2 1.2 0 0 1-1.2 1.3H5.5a1.2 1.2 0 0 1-1.2-1.3l.9-10.6z" /><path d="M8.6 10.4V7.6a3.4 3.4 0 0 1 6.8 0v2.8" /><path d="M9.2 14.2c.5 1.1 1.5 1.7 2.8 1.7s2.3-.6 2.8-1.7" /></svg>
              {count > 0 && <span className="nav-badge">{count}</span>}
            </button>
            <a className="nav-cta mono" href={waLink(BUY_MSG)} target="_blank" rel="noopener noreferrer">Adquirir <Arrow /></a>
          </div>
          <button className="nav-burger" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen((o) => !o)}><i /></button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="sheet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            {LINKS.map((l, i) => (
              <motion.a key={l.id} href={'#' + l.id} onClick={() => setOpen(false)} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 * i + 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                {l.label}
              </motion.a>
            ))}
            <motion.a href={waLink(BUY_MSG)} target="_blank" rel="noopener noreferrer" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}><em>Adquirir →</em></motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
