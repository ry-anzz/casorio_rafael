// GET /api/convidados?q=gio   ou   ?c=TOKEN
export async function buscar(req, res) {
  const { q, c } = req.query;
  let query = sb.from('convidados').select('id,nome,acompanhante,status,vai_convidado,vai_acompanhante');
  if (c) query = query.eq('token', c).limit(1);
  else if (q && q.trim().length >= 3) query = query.ilike('nome_busca', `%${norm(q.trim())}%`).limit(5);
  else return res.json({ convidados: [] });
  const { data } = await query;
  res.json({ convidados: data || [] });
}

// POST /api/rsvp
export async function confirmar(req, res) {
  const { id, presenca, vaiConvidado, vaiAcompanhante, restricao } = req.body;
  if (!id) return res.status(400).end();
  await sb.from('convidados').update({
    status: presenca,
    vai_convidado: presenca === 'sim' ? vaiConvidado : false,
    vai_acompanhante: presenca === 'sim' ? vaiAcompanhante : false,
    restricao: restricao?.slice(0, 300) || null,
    respondido_em: new Date().toISOString(),
  }).eq('id', id);
  res.json({ ok: true });
}