const url = () => `${process.env.SUPABASE_URL}/rest/v1/presentes_pagos`;

const headers = () => ({
  apikey: process.env.SUPABASE_SERVICE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
  'Content-Type': 'application/json',
});

// Categorias em que o mesmo item pode ser presenteado várias vezes (cotas)
export const CATEGORIAS_MULTIPLAS = ['experiencias'];

export async function salvarPagamento(registro) {
  const r = await fetch(`${url()}?on_conflict=payment_id`, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify(registro),
  });
  if (!r.ok) throw new Error(`Supabase: ${await r.text()}`);
}

export async function itensPagos() {
  const r = await fetch(`${url()}?select=categoria,item&status=eq.approved`, {
    headers: headers(),
  });
  if (!r.ok) throw new Error(`Supabase: ${await r.text()}`);
  return r.json();
}

export async function itemJaPago(categoria, item) {
  const q = `?select=id&status=eq.approved&limit=1&categoria=eq.${encodeURIComponent(
    categoria
  )}&item=eq.${encodeURIComponent(item)}`;
  const r = await fetch(url() + q, { headers: headers() });
  if (!r.ok) return false;
  const dados = await r.json();
  return dados.length > 0;
}