import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const OIL_NAMES: Record<string, string> = { arbequina: 'Arbequina', koroneiki: 'Koroneiki', picual: 'Picual', blend: 'Blend' };
export const OIL_TAGS: Record<string, string> = { arbequina: 'Suave e aromática', koroneiki: 'Frutado e equilibrado', picual: 'Intensa e marcante', blend: 'Da casa' };
export const MAX_QTY = 24;

type Items = Record<string, number>;
interface Cart {
  items: Items;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const KEY = 'mattedi-cart';
const Ctx = createContext<Cart | null>(null);

function load(): Items {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}') as Record<string, unknown>;
    const out: Items = {};
    for (const id of Object.keys(OIL_NAMES)) {
      const q = Number(raw[id]);
      if (Number.isInteger(q) && q > 0) out[id] = Math.min(q, MAX_QTY);
    }
    return out;
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Items>(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* sem armazenamento */ }
  }, [items]);

  const add = useCallback((id: string) => {
    if (!(id in OIL_NAMES)) return;
    setItems((s) => ({ ...s, [id]: Math.min((s[id] || 0) + 1, MAX_QTY) }));
    setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((s) => {
      const next = { ...s };
      if (qty <= 0) delete next[id]; else next[id] = Math.min(qty, MAX_QTY);
      return next;
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);
  const count = useMemo(() => Object.values(items).reduce((a, b) => a + b, 0), [items]);
  const value = useMemo(() => ({ items, count, open, setOpen, add, setQty, clear }), [items, count, open, add, setQty, clear]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart fora do CartProvider');
  return c;
}
