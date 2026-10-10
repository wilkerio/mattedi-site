/**
 * Estimativa de frete saindo de Cachoeira do Sul (RS). VALORES PROVISÓRIOS: a Mattedi precisa confirmar
 * os reais (Correios/transportadora) e ajustar esta tabela. `base` = 1 frasco; `extra` = cada frasco a mais.
 */
const ZONAS = [
  { ufs: ['RS'], base: 25, extra: 6 },
  { ufs: ['SC', 'PR'], base: 30, extra: 7 },
  { ufs: ['SP', 'RJ', 'MG', 'ES'], base: 38, extra: 9 },
  { ufs: ['DF', 'GO', 'MS', 'MT', 'BA', 'SE', 'TO'], base: 48, extra: 11 },
  { ufs: ['AL', 'PE', 'PB', 'RN', 'CE', 'PI', 'MA', 'PA', 'AP', 'AM', 'RR', 'RO', 'AC'], base: 62, extra: 14 },
];

export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export const maskCep = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};

export function estimate(uf: string, qty: number): { min: number; max: number } | null {
  const z = ZONAS.find((x) => x.ufs.includes(uf));
  if (!z || qty < 1) return null;
  const v = z.base + z.extra * (qty - 1);
  return { min: Math.round(v * 0.85), max: Math.round(v * 1.15) };
}

export interface Destino { cidade: string; uf: string }

/** Consulta o CEP no ViaCEP. Lança Error com mensagem pronta para mostrar à pessoa. */
export async function lookupCep(cep: string): Promise<Destino> {
  const d = cep.replace(/\D/g, '');
  if (d.length !== 8) throw new Error('Digite um CEP com 8 números.');
  let j: { erro?: boolean; localidade: string; uf: string };
  try {
    const r = await fetch(`https://viacep.com.br/ws/${d}/json/`, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error('http');
    j = await r.json();
  } catch {
    throw new Error('Não foi possível consultar o CEP agora. Tente de novo ou fale com a Mattedi.');
  }
  if (j.erro) throw new Error('CEP não encontrado. Confira os números.');
  return { cidade: j.localidade, uf: j.uf };
}
