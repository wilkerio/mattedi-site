import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Arrow, EASE } from './ui';
import { BUY_MSG, waLink } from './Nav';

const INTERVAL = 5000;

interface Slide { img: string; alt: string; pos: string; kicker: string; title: string; em: string; sub: string }
const SLIDES: Slide[] = [
  { img: '/img/hero.jpg', alt: 'Oliveiras ao entardecer, com o sol entre os galhos', pos: '50% 40%', kicker: 'Cachoeira do Sul · Rio Grande do Sul', title: 'Doze dias de colheita.', em: 'Um ano inteiro em cada gota.', sub: 'Azeite extra virgem orgânico e biodinâmico, nascido de um olival de 25 hectares no sul do Brasil.' },
  { img: '/img/ramo.jpg', alt: 'Ramo de oliveira com azeitonas', pos: '50% 50%', kicker: 'Orgânico · Biodinâmico', title: 'Cultivado com paciência.', em: 'Colhido à mão.', sub: 'Mais de 7 mil oliveiras, cuidadas sem pressa, sem química e sem atalhos.' },
  { img: '/img/redes.jpg', alt: 'Redes de colheita estendidas entre as oliveiras', pos: '50% 50%', kicker: 'Safra 2026 · Edição de 250 ml', title: 'O tempo revela', em: 'o melhor fruto.', sub: 'Arbequina, Koroneiki, Picual e o Blend da casa: quatro azeites, uma só assinatura.' },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const run = !reduce && !paused;

  useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i, run]);

  const s = SLIDES[i];
  return (
    <section id="topo" className="hero" aria-label="Mattedi, azeite extra virgem orgânico" aria-roledescription="carrossel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence initial={false}>
        <motion.img key={s.img} className="hero-photo" src={s.img} alt={s.alt} style={{ objectPosition: s.pos }}
          initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease: EASE }, scale: { duration: 7, ease: 'linear' } }} fetchPriority={i === 0 ? 'high' : undefined} />
      </AnimatePresence>
      <div className="hero-shade" />

      <div className="hero-in">
        <h1 className="sr-only">Mattedi, azeite extra virgem orgânico e biodinâmico de Cachoeira do Sul</h1>
        <div className="hero-copy" aria-live={run ? 'off' : 'polite'}>
          {SLIDES.map((x, k) => (
            <div key={x.title} className={`hero-slide${k === i ? ' on' : ''}`} aria-hidden={k !== i}>
              <p className="hero-kicker mono"><i />{x.kicker}<i /></p>
              <p className="display hero-h">{x.title}<span className="l2"><em>{x.em}</em></span></p>
              <p className="hero-sub">{x.sub}</p>
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <a href="#azeites" className="btn btn-primary">Descobrir os azeites <Arrow /></a>
          <a href={waLink(BUY_MSG)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Adquirir a Safra 2026</a>
        </div>
      </div>

      <div className="hero-dots" role="group" aria-label="Escolher slide">
        {SLIDES.map((_, k) => (
          <button key={k} className="hero-dot" aria-label={`Slide ${k + 1} de ${SLIDES.length}`} aria-current={k === i} onClick={() => setI(k)}>
            <span key={k === i ? "a" + i : "b"} style={k === i ? (run ? { animation: `heroFill ${INTERVAL}ms linear forwards` } : { transform: "scaleX(1)" }) : undefined} />
          </button>
        ))}
        {!reduce && (
          <button className="hero-pause mono" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Retomar a troca automática' : 'Pausar a troca automática'}>{paused ? '▶' : '❚❚'}</button>
        )}
      </div>
    </section>
  );
}
