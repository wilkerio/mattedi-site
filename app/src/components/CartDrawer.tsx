import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Arrow } from './ui';
import { waLink } from './Nav';
import { MAX_QTY, OIL_NAMES, OIL_TAGS, useCart } from './cart';
import { brl, estimate, lookupCep, maskCep, type Destino } from './fretecalc';

const ORDER = Object.keys(OIL_NAMES);

function buildMessage(items: Record<string, number>, dest: Destino | null, cep: string, frete: { min: number; max: number } | null) {
  const lines = ORDER.filter((id) => items[id]).map((id) => `• ${items[id]}x Azeite Mattedi ${OIL_NAMES[id]} (250 ml)`);
  const total = ORDER.reduce((a, id) => a + (items[id] || 0), 0);
  let msg = `Olá! Vim pelo site e quero comprar:\n\n${lines.join('\n')}\n\nTotal: ${total} ${total === 1 ? 'frasco' : 'frascos'} (Safra 2026).`;
  if (dest) {
    msg += `\n\nEntrega: CEP ${cep} (${dest.cidade}/${dest.uf})`;
    if (frete) msg += `, frete estimado no site de ${brl(frete.min)} a ${brl(frete.max)}`;
    msg += '.';
  }
  return msg + '\n\nPodem me passar o valor e confirmar o frete?';
}

function Suggestions({ ids, title, onAdd }: { ids: string[]; title: string; onAdd: (id: string) => void }) {
  if (!ids.length) return null;
  return (
    <section className="cart-sug" aria-label={title}>
      <p className="cart-h mono">{title}</p>
      <ul>
        {ids.map((id) => (
          <li key={id}>
            <img src={`/img/azeites/${id}.jpg`} alt="" width="48" height="60" loading="lazy" />
            <div><p className="cart-name sm">{OIL_NAMES[id]}</p><p className="cart-sub">{OIL_TAGS[id]}</p></div>
            <button className="tab-add" onClick={() => onAdd(id)} aria-label={`Adicionar ${OIL_NAMES[id]} ao pedido`}>
              <svg viewBox="0 0 16 16" aria-hidden><path d="M8 3v10M3 8h10" /></svg><span className="tab-add-t">Adicionar</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CartDrawer() {
  const { items, count, open, setOpen, add, setQty, clear } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const list = ORDER.filter((id) => items[id]);
  const missing = ORDER.filter((id) => !items[id]);

  const [cep, setCep] = useState('');
  const [dest, setDest] = useState<Destino | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const frete = dest ? estimate(dest.uf, count) : null;

  const calc = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    try { setDest(await lookupCep(cep)); } catch (x) { setDest(null); setErr(x instanceof Error ? x.message : 'Não foi possível calcular agora.'); } finally { setBusy(false); }
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="cart-scrim" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
          <motion.aside className="cart" role="dialog" aria-modal="true" aria-label="Seu pedido" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <header className="cart-head">
              <h2 className="display">Seu pedido</h2>
              <button ref={closeRef} className="cart-x" onClick={() => setOpen(false)} aria-label="Fechar o carrinho"><i /></button>
            </header>

            <div className="cart-body">
              {list.length === 0 ? (
                <div className="cart-empty">
                  <p>Seu pedido está vazio.</p>
                  <p className="cart-sub">Escolha um azeite para começar.</p>
                </div>
              ) : (
                <ul className="cart-list">
                  {list.map((id) => (
                    <li key={id} className="cart-item">
                      <img src={`/img/azeites/${id}.jpg`} alt="" width="72" height="90" />
                      <div className="cart-info">
                        <p className="cart-name">{OIL_NAMES[id]}</p>
                        <p className="cart-sub">Frasco de 250 ml · Safra 2026</p>
                        <div className="cart-qty" role="group" aria-label={`Quantidade de ${OIL_NAMES[id]}`}>
                          <button onClick={() => setQty(id, items[id] - 1)} aria-label="Diminuir quantidade">−</button>
                          <span aria-live="polite">{items[id]}</span>
                          <button onClick={() => setQty(id, items[id] + 1)} disabled={items[id] >= MAX_QTY} aria-label="Aumentar quantidade">+</button>
                        </div>
                      </div>
                      <button className="cart-rm" onClick={() => setQty(id, 0)} aria-label={`Remover ${OIL_NAMES[id]}`}>Remover</button>
                    </li>
                  ))}
                </ul>
              )}

              <Suggestions ids={missing} title={list.length ? 'Combine com' : 'Nossos azeites'} onAdd={add} />

              {list.length > 0 && (
                <section className="cart-frete" aria-label="Estimativa de frete">
                  <p className="cart-h mono">Frete</p>
                  <form onSubmit={calc}>
                    <input inputMode="numeric" autoComplete="postal-code" placeholder="Seu CEP" aria-label="CEP" value={cep} onChange={(e) => { setCep(maskCep(e.target.value)); setDest(null); }} />
                    <button className="btn btn-ghost" type="submit" disabled={busy}>{busy ? 'Calculando…' : 'Estimar'}</button>
                  </form>
                  <div aria-live="polite">
                    {err && <p className="frete-err">{err}</p>}
                    {dest && frete && (
                      <p className="cart-frete-out"><b>{brl(frete.min)} a {brl(frete.max)}</b><span>Estimativa para {dest.cidade}/{dest.uf}, {count} {count === 1 ? 'frasco' : 'frascos'}. O valor final é confirmado pela Mattedi.</span></p>
                    )}
                    {dest && !frete && <p className="cart-sub">Não conseguimos estimar para esta região. A Mattedi confirma pelo WhatsApp.</p>}
                  </div>
                </section>
              )}
            </div>

            {list.length > 0 && (
              <footer className="cart-foot">
                <p className="cart-total"><span>Total</span><b>{count} {count === 1 ? 'frasco' : 'frascos'}</b></p>
                <p className="cart-sub">O valor e o frete são combinados com a Mattedi pelo WhatsApp. Nenhum pagamento é feito aqui.</p>
                <a className="btn btn-primary cart-send" href={waLink(buildMessage(items, dest, cep, frete))} target="_blank" rel="noopener noreferrer">Enviar pedido pelo WhatsApp <Arrow /></a>
                <button className="cart-clear" onClick={clear}>Esvaziar pedido</button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
