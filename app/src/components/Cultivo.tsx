import { Fade, SplitWords } from './ui';

const CARDS = [
  {
    img: '/img/ramo.jpg', alt: 'Azeitonas no ramo, colhidas à mão', pos: '50% 40%', cap: 'Colhida à mão, azeitona por azeitona.',
    t: 'Sem agrotóxicos',
    p: 'Nem fertilizantes químicos: o solo e o fruto seguem íntegros. O cultivo é orgânico, com práticas regenerativas inspiradas na agricultura biodinâmica. A adubação verde, cobertura vegetal que devolve nutrientes à terra, dispensa o adubo químico.',
  },
  {
    img: '/img/selo-organico.png', alt: 'Selo Produto Orgânico Brasil', pos: '50% 50%', cap: '', seal: true,
    t: 'Certificação orgânica',
    p: 'O selo Orgânico Brasil está no rótulo de cada garrafa, da safra produzida em Cachoeira do Sul, RS.',
  },
];

export function Cultivo() {
  return (
    <section id="cultivo" className="sec dark">
      <div className="wrap">
        <div className="cult-top">
          <SplitWords text="O que fazemos no campo." className="display h2" />
        </div>
        <div className="cult-cards two">
          {CARDS.map((c, i) => (
            <Fade key={c.t} delay={i * 0.1}>
              <article className="cult-card">
                <div className={`cult-photo${c.seal ? ' seal' : ''}`}>
                  <img src={c.img} alt={c.alt} loading="lazy" style={{ objectPosition: c.pos }} />
                  {c.cap && <span className="cult-photo-cap mono">{c.cap}</span>}
                </div>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
