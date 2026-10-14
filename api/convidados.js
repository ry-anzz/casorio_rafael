import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const norm = (s) => s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const SELECT = 'id,status,restricao,pessoas(id,nome,ordem,vai)';

const ordenar = (lista) =>
  (lista || []).map((c) => ({ ...c, pessoas: [...c.pessoas].sort((a, b) => a.ordem - b.ordem) }));

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const { q, c } = req.query;

  if (c) {
    const { data } = await sb.from('convites').select(SELECT).eq('token', String(c)).limit(1);
    return res.json({ convidados: ordenar(data) });
  }

  const termo = q ? norm(String(q)).replace(/[%_\\]/g, '') : '';
  if (termo.length < 3) return res.json({ convidados: [] });

  const { data: achados } = await sb
    .from('pessoas').select('convite_id').ilike('nome_busca', `%${termo}%`).limit(30);

  const ids = [...new Set((achados || []).map((a) => a.convite_id))].slice(0, 6);
  if (!ids.length) return res.json({ convidados: [] });

  const { data } = await sb.from('convites').select(SELECT).in('id', ids);
  res.json({ convidados: ordenar(data) });
}