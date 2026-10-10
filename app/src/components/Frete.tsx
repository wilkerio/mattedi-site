import { useState } from 'react';
import { Arrow } from './ui';
import { waLink } from './Nav';
import { brl, estimate, lookupCep, maskCep, type Destino } from './fretecalc';

interface Result extends Destino { min: number; max: number }

export function Frete() {
  const [cep, setCep] = useState('');
  const [qtd, setQtd] = useState(2);
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const calc = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setRes(null); setBusy(true);
    try {
      const d = await lookupCep(cep);
      const est = estimate(d.uf, qtd);
      if (!est) { setErr('Não conseguimos estimar para esta região. Fale com a Mattedi.'); return; }
      setRes({ ...d, ...est });
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Não foi possível calcular agora.');
    } finally { setBusy(false); }
  };

  const msg = res
    ? `Olá! Gostaria de pedir ${qtd} ${qtd === 1 ? 'frasco' : 'frascos'} de azeite Mattedi para o CEP ${cep} (${res.cidade}/${res.uf}). Podem confirmar o valor do frete?`
    : 'Olá! Gostaria de pedir azeite Mattedi e saber o valor do frete.';

  return (
    <div className="frete">
      <div className="frete-head">
        <p className="mono">Frete</p>
        <h3>Quanto custa receber em casa?</h3>
        <p>Informe seu CEP e a quantidade de frascos para ver uma estimativa.</p>
      </div>
      <form className="frete-form" onSubmit={calc}>
        <label><span className="mono">CEP</span><input inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" value={cep} onChange={(e) => setCep(maskCep(e.target.value))} /></label>
        <label><span className="mono">Frascos de 250 ml</span>
          <select value={qtd} onChange={(e) => setQtd(+e.target.value)}>{Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}</select>
        </label>
        <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Calculando…' : 'Estimar frete'}</button>
      </form>
      <div className="frete-out" aria-live="polite">
        {err && <p className="frete-err">{err}</p>}
        {res && (
          <>
            <p className="frete-val"><span>{brl(res.min)}</span> a <span>{brl(res.max)}</span></p>
            <p className="frete-note">Estimativa para {res.cidade}/{res.uf}. O valor final é confirmado pela Mattedi ao fechar o pedido.</p>
          </>
        )}
      </div>
      <a className="btn btn-ghost frete-wa" href={waLink(msg)} target="_blank" rel="noopener noreferrer">Confirmar pelo WhatsApp <Arrow /></a>
    </div>
  );
}
