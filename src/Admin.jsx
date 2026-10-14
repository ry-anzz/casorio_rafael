import React, { useState, useEffect, useMemo } from 'react';

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const ordenadas = (c) => [...c.pessoas].sort((a, b) => a.ordem - b.ordem);
const pessoasConfirmadas = (c) =>
  c.status === 'sim' ? c.pessoas.filter((p) => p.vai).length : 0;

export default function Admin() {
  const [senha, setSenha] = useState(sessionStorage.getItem('admin_senha') || '');
  const [logado, setLogado] = useState(false);
  const [convidados, setConvidados] = useState([]);
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');

  const carregar = async (s = senha) => {
    setErro('');
    try {
      const r = await fetch('/api/admin-convidados', { headers: { 'x-admin-senha': s } });
      if (r.status === 401) throw new Error('Senha incorreta.');
      if (!r.ok) throw new Error('Erro ao carregar.');
      const d = await r.json();
      setConvidados(d.convidados);
      setLogado(true);
      sessionStorage.setItem('admin_senha', s);
    } catch (e) {
      setLogado(false);
      sessionStorage.removeItem('admin_senha');
      setErro(e.message);
    }
  };

  useEffect(() => {
    if (senha) carregar(senha);
  }, []);

  const resumo = useMemo(() => ({
  total: convidados.length,
  sim: convidados.filter((c) => c.status === 'sim').length,
  nao: convidados.filter((c) => c.status === 'nao').length,
  pendente: convidados.filter((c) => c.status === 'pendente').length,
  pessoas: convidados.reduce((acc, c) => acc + pessoasConfirmadas(c), 0),
  possiveis: convidados.reduce((acc, c) => acc + c.pessoas.length, 0),
}), [convidados]);

const lista = useMemo(
  () =>
    convidados.filter(
      (c) =>
        (filtro === 'todos' || c.status === filtro) &&
        (!busca || norm(c.pessoas.map((p) => p.nome).join(' ')).includes(norm(busca)))
    ),
  [convidados, filtro, busca]
);

  const exportarCsv = () => {
  const linhas = [['Pessoa', 'Convite', 'Status do convite', 'Vai', 'Restrição']];
  lista.forEach((c) => {
    const grupo = ordenadas(c).map((p) => p.nome).join(' / ');
    ordenadas(c).forEach((p) =>
      linhas.push([p.nome, grupo, c.status, c.status === 'sim' ? (p.vai ? 'sim' : 'não') : '', c.restricao || ''])
    );
  });
  const csv = linhas.map((l) => l.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
  const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url; a.download = 'confirmacoes.csv'; a.click();
  URL.revokeObjectURL(url);
};

  if (!logado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E9DFD3] px-6">
        <form
          onSubmit={(e) => { e.preventDefault(); carregar(); }}
          className="w-full max-w-xs space-y-4 rounded-md border border-dourado/30 bg-[#F3ECE0] p-6"
        >
          <h1 className="text-center font-apoio text-xs tracking-[0.3em] text-dourado">ÁREA DOS NOIVOS</h1>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-md border border-dourado/30 bg-transparent px-3 py-2.5 text-sm text-vinho focus:outline-none"
          />
          <button className="w-full rounded-md bg-[#A48255] py-3 font-apoio text-[10px] tracking-[0.2em] text-[#F5EEE4]">
            ENTRAR
          </button>
          {erro && <p className="text-center text-xs text-red-800">{erro}</p>}
        </form>
      </div>
    );
  }

  const cards = [
    { label: 'PESSOAS CONFIRMADAS', valor: resumo.pessoas },
    { label: 'CONVITES: SIM', valor: resumo.sim },
    { label: 'CONVITES: NÃO', valor: resumo.nao },
    { label: 'PENDENTES', valor: resumo.pendente },
  ];

  const rotulo = { sim: 'Confirmado', nao: 'Não vai', pendente: 'Pendente' };

  return (
    <div className="min-h-screen bg-[#E9DFD3] px-4 py-8 text-vinho">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-apoio text-sm tracking-[0.3em] text-dourado">CONFIRMAÇÕES</h1>
          <div className="flex gap-3 text-xs">
            <button onClick={() => carregar()} className="underline">Atualizar</button>
            <button onClick={exportarCsv} className="underline">Exportar CSV</button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-md border border-dourado/30 bg-[#F3ECE0] p-4 text-center">
              <p className="text-3xl font-light text-dourado">{c.valor}</p>
              <p className="mt-1 font-apoio text-[8px] tracking-[0.2em] text-vinho/70">{c.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar nome"
            className="flex-1 rounded-md border border-dourado/30 bg-[#F3ECE0] px-3 py-2 text-sm focus:outline-none"
          />
          <div className="flex gap-2">
            {['todos', 'sim', 'nao', 'pendente'].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`rounded-md border px-3 py-2 text-xs ${
                  filtro === f ? 'border-dourado/60 bg-[#E8DCC8]' : 'border-dourado/30'
                }`}
              >
                {f === 'todos' ? 'Todos' : rotulo[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-dourado/30 bg-[#F3ECE0]">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="border-b border-dourado/30 font-apoio text-[9px] tracking-[0.15em] text-vinho/70">
              <tr>
                <th className="p-3">CONVITE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">VÃO</th>
                <th className="p-3">RESTRIÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((c) => (
  <tr key={c.id} className="border-b border-dourado/10 last:border-0">
    <td className="p-3">
      {ordenadas(c).map((p) => (
        <div key={p.id} className={c.status === 'sim' && !p.vai ? 'text-vinho/40 line-through' : ''}>
          {p.nome}
        </div>
      ))}
    </td>
    <td className="p-3">{rotulo[c.status] || c.status}</td>
    <td className="p-3">{c.status === 'sim' ? `${pessoasConfirmadas(c)}/${c.pessoas.length}` : '—'}</td>
    <td className="p-3">{c.restricao || '—'}</td>
  </tr>
))}
              {lista.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-vinho/60">Nenhum resultado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}