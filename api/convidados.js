import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const norm = (s) =>
  s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { q, c } = req.query;
  let query = sb
    .from('convidados')
    .select('id,nome,acompanhante,status,vai_convidado,vai_acompanhante');

  if (c) query = query.eq('token', String(c)).limit(1);
  else if (q && String(q).trim().length >= 3)
    query = query.ilike('nome_busca', `%${norm(String(q))}%`).limit(5);
  else return res.json({ convidados: [] });

  const { data, error } = await query;
  if (error) return res.status(500).json({ convidados: [] });
  res.json({ convidados: data || [] });
}