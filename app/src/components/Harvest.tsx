import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Fade, SplitWords } from './ui';

// Março de 2026 começa em um domingo; a colheita ocupa os dias 1 a 12 (calendário da própria Mattedi).
const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export function Harvest() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  return (
    <section id="colheita" className="sec light">
      <div className="wrap">
        <div className="harvest-grid">
          <div>
            <p className="eyebrow mono"><b>01</b> A colheita</p>
            <SplitWords text="A azeitona não espera." className="display h2" />
            <Fade delay={0.15}>
              <p className="lead" style={{ marginTop: 32 }}>
                A colheita dura doze dias, em março. É nesse intervalo que o olival entrega o ano inteiro: o fruto segue direto para a extração e se transforma no azeite da safra.
              </p>
            </Fade>
            <Fade delay={0.25}>
              <p className="lead" style={{ marginTop: 18 }}>
                <em style={{ fontFamily: 'Newsreader Variable, serif', fontSize: '1.25em', color: '#6b5a10' }}>O tempo revela o melhor fruto.</em>
              </p>
            </Fade>
          </div>

          <div ref={ref} className="cal" data-in={inView} role="img" aria-label="Calendário de março de 2026 com a colheita nos dias 1 a 12">
            <div className="cal-head">
              <span className="m">Mar<em>ço</em></span>
              <span className="mono" style={{ color: 'rgba(237,232,215,.64)' }}>MMXXVI</span>
            </div>
            <div className="cal-grid">
              {DOW.map((d, i) => <span key={'d' + i} className="cal-dow mono">{d}</span>)}
              {DAYS.map((d) => (
                <span key={d} className={`cal-day ${d <= 12 ? 'on' : ''} ${d === 1 || d === 12 ? 'edge' : ''}`} style={{ ['--i' as string]: d - 1 }}><span>{d}</span></span>
              ))}
            </div>
            <div className="cal-foot mono"><span><i />12 dias de colheita</span><img src="/brand/logo-horizontal-ouro.png" alt="Mattedi" width="1300" height="190" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
