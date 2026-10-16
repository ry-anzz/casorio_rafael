import catalogo from './_catalogo.js';
import { itemJaPago, CATEGORIAS_MULTIPLAS } from './_supabase.js';

const INFINITEPAY_LINKS = 'https://api.checkout.infinitepay.io/links';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { slug, nome, convidado, mensagem } = req.body || {};
  const nomeNormalizado = String(nome || '').normalize('NFC');
  const chave = `${slug}|${nomeNormalizado}`;
  const preco = catalogo[chave]; // em reais

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

  // A InfinitePay não tem metadata: os dados do presente viajam dentro do order_nsu
  // (volta no webhook). "t" garante que o order_nsu seja único a cada tentativa.
  const ref = {
    c: slug,
    i: nomeNormalizado,
    v: convidado.trim().slice(0, 40),
    m: (mensagem || '').slice(0, 50),
    t: Date.now().toString(36),
  };
  let orderNsu = Buffer.from(JSON.stringify(ref)).toString('base64url');
  if (orderNsu.length > 200) {
    ref.m = '';
    orderNsu = Buffer.from(JSON.stringify(ref)).toString('base64url');
  }

  const corpo = {
    handle: process.env.INFINITEPAY_HANDLE, // sua InfiniteTag, sem o "$"
    order_nsu: orderNsu,
    items: [
      {
        quantity: 1,
        price: Math.round(preco * 100), // a InfinitePay usa centavos
        description: `Presente: ${nomeNormalizado}`,
      },
    ],
    redirect_url: `${site}/presentes/obrigado`,
  };

  // webhook só funciona com https (em localhost não)
  if (site.startsWith('https://')) {
    corpo.webhook_url = `${site}/api/webhook-mp`;
  }

  try {
    const resposta = await fetch(INFINITEPAY_LINKS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    });

    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok || !dados.url) {
      console.error('Erro InfinitePay:', resposta.status, dados);
      return res.status(502).json({ erro: 'Falha ao criar o pagamento' });
    }

    return res.status(200).json({ url: dados.url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}