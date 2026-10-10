import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Arrow, Fade, SplitWords } from './ui';
import { useCart } from './cart';

// Descrições e harmonizações: as publicadas pela própria Mattedi. O Blend ainda não tem descrição pública.
interface Oil { id: string; name: string; tag: string; level: 0 | 1 | 2 | 3; head: string; text: string; pair: string[]; tint: string; glow: string }
const OILS: Oil[] = [
  { id: 'arbequina', name: 'Arbequina', tag: 'Suave e aromática', level: 1, head: 'Suave e aromática.', text: 'Frutado médio com leve picância. Perfeita para quem está descobrindo azeites.', pair: ['Saladas', 'Peixes', 'Pão'], tint: '#b9c62e', glow: 'rgba(185,198,46,0.22)' },
  { id: 'koroneiki', name: 'Koroneiki', tag: 'Frutado e equilibrado', level: 2, head: 'Frutado e equilibrado.', text: 'Com leve picância e amargor. Alto teor de polifenóis.', pair: ['Risotos', 'Bacalhau', 'Massas'], tint: '#9fb23a', glow: 'rgba(159,178,58,0.22)' },
  { id: 'picual', name: 'Picual', tag: 'Intensa e marcante', level: 3, head: 'Intensa e marcante.', text: 'Picante, com leve amargor herbáceo. Rica em antioxidantes.', pair: ['Carnes', 'Risotos', 'Pratos robustos'], tint: '#7d9a2c', glow: 'rgba(125,154,44,0.26)' },
  { id: 'blend', name: 'Blend', tag: 'Da casa', level: 0, head: 'O blend da Safra 2026.', text: 'A composição da casa para o ano, engarrafada em 250 ml.', pair: [], tint: '#c7b13a', glow: 'rgba(220,180,78,0.22)' },
];
const SCALE = ['Suave', 'Médio', 'Intenso'];

export function Azeites() {
  const [i, setI] = useState(0);
  const { add, items } = useCart();
  const o = OILS[i];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setI((i + 1) % OILS.length); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setI((i + OILS.length - 1) % OILS.length); }
  };
  return (
    <section id="azeites" className="sec oils dark" style={{ ['--oil-glow' as string]: o.glow }}>
      <div className="wrap oils-grid">
        <div className="stage" aria-hidden={false}>
          <div className="stage-frame">
          <AnimatePresence initial={false}>
            <motion.img key={o.id} className="stage-img" src={`/img/azeites/${o.id}.jpg`} alt={`Garrafa de azeite Mattedi ${o.name}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} />
          </AnimatePresence>
          </div>
        </div>

        <div>
          <SplitWords text="Quatro azeites, um olival." className="display h2 oils-title" />
          <div className="tabs" role="tablist" aria-label="Escolha o azeite" onKeyDown={onKey}>
            {OILS.map((x, k) => (
              <div key={x.id} className="tab-row" role="presentation">
                <button role="tab" id={'tab-' + x.id} aria-selected={k === i} aria-controls="oil-panel" tabIndex={k === i ? 0 : -1} className="tab" onClick={() => setI(k)} onMouseEnter={() => window.matchMedia('(hover:hover)').matches && setI(k)}>
                  {x.name}
                </button>
                <button type="button" className="tab-add" onClick={() => add(x.id)} aria-label={`Adicionar ${x.name} ao pedido${items[x.id] ? `, ${items[x.id]} no pedido` : ''}`}>
                  <svg viewBox="0 0 16 16" aria-hidden><path d="M8 3v10M3 8h10" /></svg>
                  <span className="tab-add-t">Adicionar</span>
                  {items[x.id] ? <em>{items[x.id]}</em> : null}
                </button>
              </div>
            ))}
          </div>
          <div className="detail" id="oil-panel" role="tabpanel" aria-labelledby={'tab-' + o.id}>
            <AnimatePresence mode="wait">
              <motion.div key={o.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                <h3>{o.head}</h3>
                <p>{o.text}</p>
                {o.level > 0 && (
                  <div className="meter mono" aria-label={`Intensidade: ${SCALE[o.level - 1]}`}>
                    <span>Intensidade</span>
                    <span className="steps">{[1, 2, 3].map((n) => <i key={n} className={n <= o.level ? 'on' : ''} />)}</span>
                    <span style={{ color: 'var(--oliva)' }}>{SCALE[o.level - 1]}</span>
                  </div>
                )}
                {o.pair.length > 0 && (
                  <div>
                    <p className="mono" style={{ color: 'var(--muted-dark)', margin: '0 0 10px' }}>Harmoniza com</p>
                    <div className="pair">{o.pair.map((p) => <span key={p} className="chip">{p}</span>)}</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <Fade><button type="button" onClick={() => add(o.id)} className="btn btn-primary oils-cta">Adicionar ao pedido <Arrow /></button>{items[o.id] ? <span className="oils-in mono">{items[o.id]} no pedido</span> : null}</Fade>
          <Fade><p className="size mono">Edição Safra 2026 · Frasco de 250 ml · Selo Orgânico Brasil</p></Fade>
        </div>
      </div>
    </section>
  );
}
