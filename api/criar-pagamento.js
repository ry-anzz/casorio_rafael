import catalogo from './_catalogo.js';
import { itemJaPago, CATEGORIAS_MULTIPLAS } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { slug, nome, convidado, mensagem } = req.body || {};
  const nomeNormalizado = String(nome || '').normalize('NFC');
  const chave = `${slug}|${nomeNormalizado}`;
  const preco = catalogo[chave];

  if (!preco || !convidado?.trim()) {
    return res.status(400).json({ erro: 'Dados inválidos' });
  }

  // Bloqueia item já presenteado (se o Supabase falhar, não derruba o pagamento)
  try {
    if (
      !CATEGORIAS_MULTIPLAS.includes(slug) &&
      (await itemJaPago(slug, nomeNormalizado))
    ) {
      return res.status(409).json({ erro: 'Este presente já foi escolhido' });
    }
  } catch (e) {
    console.error('Falha ao checar item no Supabase:', e);
  }

  const site = (process.env.SITE_URL || `https://${req.headers.host}`).replace(/\/$/, '');

  // Dados do presente dentro do external_reference (limite de 256 caracteres)
  const ref = {
    c: slug,
    i: nomeNormalizado,
    v: convidado.trim().slice(0, 40),
    m: (mensagem || '').slice(0, 50),
  };
  let externalRef = Buffer.from(JSON.stringify(ref)).toString('base64url');
  if (externalRef.length > 256) {
    ref.m = '';
    externalRef = Buffer.from(JSON.stringify(ref)).toString('base64url');
  }

  const preferencia = {
    items: [
      {
        id: chave,
        title: `Presente: ${nome}`,
        quantity: 1,
        unit_price: preco,
        currency_id: 'BRL',
      },
    ],
    back_urls: {
      success: `${site}/presentes/obrigado`,
      pending: `${site}/presentes/obrigado`,
      failure: `${site}/presentes/${slug}`,
    },
    external_reference: externalRef,
    statement_descriptor: 'ISABELLA RAFAEL',
    metadata: {
      convidado: convidado.trim().slice(0, 80),
      mensagem: (mensagem || '').slice(0, 300),
      item: nomeNormalizado,
      categoria: slug,
    },
  };

  // auto_return e notification_url só funcionam com https (em localhost não)
  if (site.startsWith('https://')) {
    preferencia.auto_return = 'approved';
    preferencia.notification_url = `${site}/api/webhook-mp`;
  }

  try {
    const resposta = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferencia),
    });

    const dados = await resposta.json();
    if (!resposta.ok) {
      console.error('Erro Mercado Pago:', dados);
      return res.status(502).json({ erro: 'Falha ao criar o pagamento' });
    }

    return res.status(200).json({ url: dados.init_point });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}