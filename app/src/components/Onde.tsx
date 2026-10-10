import { Arrow, Fade, SplitWords } from './ui';
import { BUY_MSG, waLink } from './Nav';
import { Frete } from './Frete';

const mapLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export function Onde() {
  return (
    <section id="onde" className="sec light">
      <div className="wrap">
        <SplitWords text="Direto do produtor, até a sua mesa." className="display h2" />

        <div className="where-grid">
          <Fade>
            <article className="card">
              <div>
                <p className="mono">Feira orgânica · Porto Alegre</p>
                <h3>Menino Deus</h3>
                <p>Av. Getúlio Vargas, 1384, Menino Deus.</p>
                <a className="map-link mono" href={mapLink('Av. Getúlio Vargas, 1384, Menino Deus, Porto Alegre, RS')} target="_blank" rel="noopener noreferrer">Ver no mapa <Arrow /></a>
              </div>
              <div className="when"><b>quartas</b><span className="mono">11h às 17h30</span></div>
            </article>
          </Fade>
          <Fade delay={0.08}>
            <article className="card">
              <div>
                <p className="mono">Feira orgânica · Porto Alegre</p>
                <h3>Feira do Lutz</h3>
                <p>Centro Cultural Vila Flores, Rua São Carlos, 759, Floresta.</p>
                <a className="map-link mono" href={mapLink('Centro Cultural Vila Flores, Rua São Carlos, 759, Floresta, Porto Alegre, RS')} target="_blank" rel="noopener noreferrer">Ver no mapa <Arrow /></a>
              </div>
              <div className="when"><b>quartas</b><span className="mono">8h15 às 12h</span></div>
            </article>
          </Fade>
          <Fade delay={0.16}>
            <a className="card hot" href={waLink(BUY_MSG)} target="_blank" rel="noopener noreferrer">
              <div>
                <p className="mono">Online · WhatsApp</p>
                <h3>Receba a Safra 2026 em casa.</h3>
                <p>Os quatro azeites, direto da Mattedi.</p>
              </div>
              <span className="card-cta">Adquirir pelo WhatsApp <Arrow /></span>
            </a>
          </Fade>
        </div>

        <Fade delay={0.05}><Frete /></Fade>
      </div>
    </section>
  );
}
