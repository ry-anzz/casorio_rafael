import catalogo from './_catalogo.js';
import { salvarPagamento } from './_supabase.js';

const INFINITEPAY_CHECK = 'https://api.checkout.infinitepay.io/payment_check';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).end();

  const { order_nsu, transaction_nsu, invoice_slug } = req.body || {};
  console.log('Webhook InfinitePay:', order_nsu?.slice(0, 20), transaction_nsu);

  if (!order_nsu || !transaction_nsu) return res.status(200).end();

  // Decodifica os dados do presente que mandamos no order_nsu
  let d;
  try {
    d = JSON.parse(Buffer.from(order_nsu, 'base64url').toString('utf8'));
    if (!d.c || !d.i) throw new Error();
  } catch {
    console.warn('order_nsu sem dados do presente:', transaction_nsu);
    return res.status(200).end();
  }

  try {
    // O webhook não é autenticado: confirma o pagamento direto na InfinitePay
    const r = await fetch(INFINITEPAY_CHECK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        handle: process.env.INFINITEPAY_HANDLE,
        order_nsu,
        transaction_nsu,
        slug: invoice_slug,
      }),
    });
    if (!r.ok) return res.status(400).end(); // 400 = a InfinitePay tenta de novo

    const check = await r.json();
    if (!check.success || !check.paid) return res.status(200).end();

    // Qualquer pessoa consegue criar um link no seu handle: confere se o valor
    // pago cobre o preço do catálogo, senão alguém poderia "comprar" por R$ 0,01.
    const item = String(d.i).normalize('NFC');
    const preco = catalogo[`${d.c}|${item}`];
    if (!preco || check.amount < Math.round(preco * 100)) {
      console.warn('Valor não confere com o catálogo:', transaction_nsu, check.amount);
      return res.status(200).end();
    }

    await salvarPagamento({
      payment_id: String(transaction_nsu),
      categoria: d.c,
      item,
      convidado: d.v || null,
      mensagem: d.m || null,
      valor: check.amount / 100, // sem os juros do parcelamento
      status: 'approved',
      status_detail: check.capture_method || null,
    });

    return res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
}