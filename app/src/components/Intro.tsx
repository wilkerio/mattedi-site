import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Abertura curta com o logo, uma vez por visita. */
export function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    try { return !reduce && !sessionStorage.getItem('mattedi-intro'); } catch { return !reduce; }
  });
  useEffect(() => {
    if (!show) return;
    try { sessionStorage.setItem('mattedi-intro', '1'); } catch { /* sem armazenamento */ }
    const t = setTimeout(() => setShow(false), 2300);
    return () => clearTimeout(t);
  }, [show]);
  if (!show) return null;
  return (
    <motion.div className="intro" aria-hidden initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.7, duration: 0.6, ease: 'easeInOut' }}>
      <motion.img src="/brand/logo-vertical-ouro.png" alt="" width="1000" height="338" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
    </motion.div>
  );
}
