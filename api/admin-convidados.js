import { createClient } from '@supabase/supabase-js';
import { timingSafeEqual } from 'crypto';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const senhaOk = (recebida = '') => {
  const a = Buffer.from(String(recebida));
  const b = Buffer.from(process.env.ADMIN_PASSWORD || '');
  return a.length === b.length && b.length > 0 && timingSafeEqual(a, b);
};

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!senhaOk(req.headers['x-admin-senha'])) return res.status(401).json({ erro: 'senha' });

  const { data, error } = await sb
    .from('convidados')
    .select('id,nome,acompanhante,status,vai_convidado,vai_acompanhante,restricao,respondido_em,token')
    .order('nome');

  if (error) return res.status(500).json({ erro: 'banco' });
  res.json({ convidados: data });
}