import catalogo from './_catalogo.js';
import { itemJaPago, CATEGORIAS_MULTIPLAS } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { slug, nome, convidado, mensagem } = req.body || {};
  const chave = `${slug}|${String(nome || '').normalize('NFC')}`;
  const preco = catalogo[chave];

  if (!preco || !convidado?.trim()) {
    return res.status(400).json({ erro: 'Dados inválidos' });
  }
  if (!CATEGORIAS_MULTIPLAS.includes(slug) && (await itemJaPago(slug, String(nome).normalize('NFC')))) {
  return res.status(409).json({ erro: 'Este presente já foi escolhido' });
}

  const site = (process.env.SITE_URL || `https://${req.headers.host}`).replace(/\/$/, '');

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
    external_reference: `${slug}-${Date.now()}`,
    statement_descriptor: 'ISABELLA RAFAEL',
    metadata: {
      convidado: convidado.trim().slice(0, 80),
      mensagem: (mensagem || '').slice(0, 300),
      item: nome,
      categoria: slug,
    },
  };

  // auto_return só aceita URLs https (em localhost, o convidado volta pelo botão do Mercado Pago)
  if (site.startsWith('https://')) preferencia.auto_return = 'approved';

  // logo depois do bloco que define auto_return:
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