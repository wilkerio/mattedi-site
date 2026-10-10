import { Fade, SplitWords } from './ui';

export function Historia() {
  return (
    <section id="historia" className="sec light">
      <div className="wrap hist-grid">
        <div className="hist-title">
          <SplitWords text="Nossa história." className="display h2" />
          <span className="hist-gem" aria-hidden />
          <Fade delay={0.2}><p className="hist-sign mono">Fazenda Mattedi Soares · Cachoeira do Sul, RS</p></Fade>
        </div>

        <div className="hist-text">
          <Fade>
            <p className="hist-lead">O Azeite Mattedi nasce do encanto de seus fundadores pelo azeite de oliva e do desejo de produzir, no Brasil, um azeite de excelência.</p>
          </Fade>
          <Fade delay={0.08}>
            <p>Foi na Fazenda Mattedi Soares, em Cachoeira do Sul, que esse projeto encontrou seu lugar. Após anos de estudo e dedicação, identificamos um terroir com alto potencial para a olivicultura.</p>
          </Fade>
          <Fade delay={0.12}>
            <p>Hoje, cada oliveira é cultivada com respeito à terra e aos seus ciclos naturais, valorizando o equilíbrio do solo e a qualidade do fruto.</p>
          </Fade>
          <Fade delay={0.16}>
            <p>Um projeto familiar, construído com dedicação, cuidado e uma profunda conexão com a natureza.</p>
          </Fade>
          <Fade delay={0.2}>
            <blockquote className="hist-quote">Entre safras, colheitas e estações, cada azeite carrega o tempo da natureza e o olhar de quem cultiva.</blockquote>
          </Fade>
        </div>
      </div>
    </section>
  );
}
