import { IG_URL, WA_LABEL, waLink } from './Nav';

const NAV = [
  { id: 'historia', label: 'Nossa história' },
  { id: 'cultivo', label: 'O cultivo' },
  { id: 'azeites', label: 'Os azeites' },
  { id: 'onde', label: 'Onde comprar' },
];

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <img className="foot-logo" src="/brand/logo-horizontal-ouro.png" alt="Mattedi" width="1300" height="190" loading="lazy" />
        <div className="foot-cols">
          <div>
            <p className="foot-h mono">Navegue</p>
            <ul>{NAV.map((l) => <li key={l.id}><a href={'#' + l.id}>{l.label}</a></li>)}</ul>
          </div>
          <div>
            <p className="foot-h mono">Fale com a Mattedi</p>
            <ul>
              <li><a href={waLink('Olá! Gostaria de saber mais sobre os azeites Mattedi.')} target="_blank" rel="noopener noreferrer">WhatsApp {WA_LABEL}</a></li>
              <li><a href={IG_URL} target="_blank" rel="noopener noreferrer">Instagram @azeitemattedi</a></li>
            </ul>
          </div>
          <div>
            <p className="foot-h mono">Encontre nas feiras</p>
            <ul>
              <li>Menino Deus · quartas, 11h às 17h30</li>
              <li>Feira do Lutz · quartas, 8h15 às 12h</li>
            </ul>
          </div>
        </div>

        <div className="foot-bar mono">
          <span>Cachoeira do Sul · Rio Grande do Sul</span>
          <span>Produto orgânico e biodinâmico · Selo Orgânico Brasil</span>
        </div>
        <p className="credits mono">
          Fotos ilustrativas, a serem trocadas pelas da Mattedi · Capa: Jan Remund, <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" rel="noopener noreferrer">CC BY 2.0</a> · Redes: Dietmar Rabich, <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · Ramo: M sh, <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · via Wikimedia Commons
        </p>
      </div>
    </footer>
  );
}
