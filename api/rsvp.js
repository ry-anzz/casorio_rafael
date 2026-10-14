import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id, presenca, vaiConvidado, vaiAcompanhante, restricao } = req.body || {};
  if (!id || !['sim', 'nao'].includes(presenca)) return res.status(400).end();

  const { error } = await sb
    .from('convidados')
    .update({
      status: presenca,
      vai_convidado: presenca === 'sim' ? !!vaiConvidado : false,
      vai_acompanhante: presenca === 'sim' ? !!vaiAcompanhante : false,
      restricao: restricao ? String(restricao).slice(0, 300) : null,
      respondido_em: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return res.status(500).json({ ok: false });
  res.json({ ok: true });
}