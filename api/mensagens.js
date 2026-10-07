import { salvarMensagem, listarMensagens, listarRecadosPresentes } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [cartas, recados] = await Promise.all([
        listarMensagens(),
        listarRecadosPresentes().catch(() => []),
      ]);

      const lista = [
        ...cartas.map((m) => ({
          nome: m.nome,
          texto: m.texto,
          item: null,
          data: m.criado_em,
        })),
        ...recados
          .filter((p) => p.mensagem && p.mensagem.trim())
          .map((p) => ({
            nome: p.convidado || 'Convidado',
            texto: p.mensagem,
            item: p.item,
            data: p.criado_em,
          })),
      ]
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 100);

      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
      return res.status(200).json({ mensagens: lista });
    } catch (e) {
      console.error(e);
      return res.status(200).json({ mensagens: [] });
    }
  }

  if (req.method === 'POST') {
    const { nome, texto, site } = req.body || {};

    // campo "site" é uma armadilha para robôs: pessoas reais não preenchem
    if (site) return res.status(200).json({ ok: true });

    const n = String(nome || '').trim();
    const t = String(texto || '').trim();

    if (!n || !t || n.length > 60 || t.length > 500) {
      return res.status(400).json({ erro: 'Dados inválidos' });
    }

    try {
      await salvarMensagem({ nome: n, texto: t });
      return res.status(200).json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ erro: 'Erro ao salvar' });
    }
  }

  return res.status(405).json({ erro: 'Método não permitido' });
}