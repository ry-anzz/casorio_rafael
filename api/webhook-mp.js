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
    const meta = pg.metadata || {};
    if (!meta.categoria || !meta.item) return res.status(200).end();

    await salvarPagamento({
      payment_id: String(pg.id),
      categoria: meta.categoria,
      item: String(meta.item).normalize('NFC'),
      convidado: meta.convidado || null,
      mensagem: meta.mensagem || null,
      valor: pg.transaction_amount,
      status: pg.status, // approved, pending, rejected, refunded...
    });

    return res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
}