import { salvarPagamento } from './_supabase.js';

export default async function handler(req, res) {
  const body = req.body || {};
  const tipo = body.type || req.query.topic;
  const id = body?.data?.id || req.query['data.id'] || req.query.id;

  // Ignora outros tipos de notificação
  if (tipo !== 'payment' || !id) return res.status(200).end();

  try {
    const r = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    });
    if (!r.ok) return res.status(500).end(); // o Mercado Pago tenta de novo

    const pg = await r.json();
console.log('Webhook recebido:', pg.id, pg.status, pg.external_reference);

let dados = null;
const meta = pg.metadata || {};
if (meta.categoria && meta.item) {
  dados = {
    categoria: meta.categoria,
    item: meta.item,
    convidado: meta.convidado,
    mensagem: meta.mensagem,
  };
} else {
  try {
    const d = JSON.parse(Buffer.from(pg.external_reference, 'base64url').toString('utf8'));
    dados = { categoria: d.c, item: d.i, convidado: d.v, mensagem: d.m };
  } catch {
    console.warn('Pagamento sem dados do presente:', pg.id);
    return res.status(200).end();
  }
}

await salvarPagamento({
  payment_id: String(pg.id),
  categoria: dados.categoria,
  item: String(dados.item).normalize('NFC'),
  convidado: dados.convidado || null,
  mensagem: dados.mensagem || null,
  valor: pg.transaction_amount,
  status: pg.status,
  status_detail: pg.status_detail || null,
});

return res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
}