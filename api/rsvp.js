import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id, presenca, pessoas, restricao } = req.body || {};
  if (!id || !['sim', 'nao'].includes(presenca)) return res.status(400).end();

  const { data: doConvite } = await sb.from('pessoas').select('id').eq('convite_id', id);
  if (!doConvite?.length) return res.status(404).end();

  const marcados = new Set((pessoas || []).filter((p) => p.vai).map((p) => p.id));
  const vaiAlguem = doConvite.some((p) => marcados.has(p.id));
  if (presenca === 'sim' && !vaiAlguem) return res.status(400).json({ ok: false, erro: 'ninguem' });

  const { error } = await sb.from('convites').update({
    status: presenca,
    restricao: presenca === 'sim' && restricao ? String(restricao).slice(0, 300) : null,
    respondido_em: new Date().toISOString(),
  }).eq('id', id);
  if (error) return res.status(500).json({ ok: false });

  await Promise.all(
    doConvite.map((p) =>
      sb.from('pessoas').update({ vai: presenca === 'sim' && marcados.has(p.id) }).eq('id', p.id)
    )
  );
  res.json({ ok: true });
}