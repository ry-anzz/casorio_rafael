import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MonogramaIR from './components/MonogramaIR';
import { categorias, itensDaCategoria, formatarPreco } from './data/presentes';

// TROQUE pelos seus dados

const WHATSAPP = '5511999999999'; // DDI + DDD + número

export default function PaginaCategoria() {
  const { slug } = useParams();
  const categoria = categorias.find((c) => c.slug === slug);
  const itens = itensDaCategoria(slug);
const [convidado, setConvidado] = useState('');
const [mensagemPresente, setMensagemPresente] = useState('');
const [carregando, setCarregando] = useState(false);
const [erro, setErro] = useState('');
  const [selecionado, setSelecionado] = useState(null);
 

const [pagos, setPagos] = useState([]);

useEffect(() => {
  fetch('/api/presentes-status')
    .then((r) => r.json())
    .then((d) => setPagos(d.pagos || []))
    .catch(() => {});
}, []);

const jaPresenteado = (item) => pagos.includes(`${slug}|${item.nome}`); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);



  const pagarMercadoPago = async () => {
  if (!convidado.trim()) {
    setErro('Por favor, informe o seu nome.');
    return;
  }
  setErro('');
  setCarregando(true);

  try {
    const r = await fetch('/api/criar-pagamento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug,
        nome: selecionado.nome,
        convidado,
        mensagem: mensagemPresente,
      }),
    });
    if (r.status === 409) {
  setErro('Este presente acabou de ser escolhido por outra pessoa. Que tal escolher outro?');
  setCarregando(false);
  setPagos((p) => [...p, `${slug}|${selecionado.nome}`]);
  return;
}
    const dados = await r.json();
    if (!r.ok || !dados.url) throw new Error(dados.erro || 'Falha');
    window.location.href = dados.url;
  } catch {
    setErro('Não foi possível iniciar o pagamento. Tente novamente.');
    setCarregando(false);
  }
};

  if (!categoria) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#EFE7DC] p-6 text-center font-principal text-vinho">
        <p className="mb-4 italic">Categoria não encontrada.</p>
        <Link to="/presentes" className="font-apoio text-xs tracking-[0.2em] text-dourado">
          ← VOLTAR PARA A LISTA
        </Link>
      </div>
    );
  }

  const mensagemWhats = selecionado
    ? encodeURIComponent(
        `Olá! Quero presentear vocês com: ${selecionado.nome} (${formatarPreco(selecionado.preco)}).`
      )
    : '';

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EFE7DC] font-principal text-vinho">
      {/* TOPO */}
      <header className="relative flex items-center justify-center px-6 py-6">
        <Link
          to="/presentes"
          className="absolute left-6 font-apoio text-[8px] tracking-[0.2em] text-vinho/70 transition hover:text-dourado md:text-[10px]"
        >
          ← VOLTAR
        </Link>
        <MonogramaIR className="h-8 w-11 md:h-10 md:w-14" />
      </header>

      {/* TÍTULO */}
      <section className="bg-[#E9DFD3] px-6 pb-10 pt-8 text-center md:pb-14 md:pt-12">
        <h1 className="text-3xl font-light tracking-[0.2em] text-vinho md:text-5xl">
          {categoria.nome}
        </h1>
        <div className="mx-auto my-5 h-px w-16 bg-dourado/50" />
        <p className="font-apoio text-[9px] tracking-[0.25em] text-vinho/70 md:text-xs">
          {itens.length} {categoria.unidade}
        </p>
      </section>

      {/* GRADE */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
        {itens.length === 0 ? (
          <p className="text-center text-sm italic text-vinho/70">
            Nenhum item encontrado nesta categoria.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {itens.map((item) => {
  const presenteado = jaPresenteado(item);
  return (
    <article
      key={item.imagem}
      className="flex flex-col border border-dourado/30 bg-[#F3ECE0] transition hover:border-dourado/60 hover:shadow-sm"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#E9DFD3]">
        <img
          src={item.imagem}
          alt={item.nome}
          loading="lazy"
          className={`h-full w-full object-cover ${presenteado ? 'opacity-50 grayscale' : ''}`}
        />
        {presenteado && (
          <span className="absolute left-2 top-2 bg-[#A48255] px-2 py-1 font-apoio text-[7px] tracking-[0.15em] text-[#F5EEE4] md:text-[9px]">
            JÁ PRESENTEADO
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center px-3 pb-4 pt-3 text-center">
        <h3 className="min-h-[2.5em] text-[13px] leading-tight text-vinho md:text-base">
          {item.nome}
        </h3>
        <div className="my-2 h-px w-6 bg-dourado/60" />
        <p className="mb-3 font-apoio text-[10px] tracking-[0.1em] text-dourado md:text-sm">
          {formatarPreco(item.preco)}
        </p>

        {presenteado ? (
          <p className="mt-auto w-full border border-dourado/20 px-2 py-2.5 font-apoio text-[8px] tracking-[0.2em] text-vinho/50 md:text-[10px]">
            OBRIGADO ♥
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setSelecionado(item)}
            className="mt-auto w-full border border-dourado/70 px-2 py-2.5 font-apoio text-[8px] tracking-[0.2em] text-dourado transition hover:bg-dourado/10 md:text-[10px]"
          >
            PRESENTEAR
          </button>
        )}
      </div>
    </article>
  );
})}
          </div>
        )}
      </section>

      {/* MODAL */}
      {selecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-vinho/30 p-4 backdrop-blur-sm"
          onClick={() => { setSelecionado(null); setErro(''); setCarregando(false); }}
        >
          <div
            className="relative w-full max-w-sm border border-dourado/30 bg-[#EFE7DC] p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => { setSelecionado(null); setErro(''); setCarregando(false); }}
              aria-label="Fechar"
              className="absolute right-4 top-3 text-xl text-vinho transition hover:text-dourado"
            >
              &#10005;
            </button>

            <img
              src={selecionado.imagem}
              alt={selecionado.nome}
              className="mx-auto mb-4 h-32 w-32 object-cover"
            />
            <h3 className="text-xl italic text-dourado">{selecionado.nome}</h3>
            <p className="mt-1 font-apoio text-xs tracking-[0.15em] text-vinho/80">
              {formatarPreco(selecionado.preco)}
            </p>

            <div className="my-5 h-px w-12 bg-dourado/40 mx-auto" />

            {selecionado.preco != null ? (
  <>
    <input
      type="text"
      value={convidado}
      onChange={(e) => setConvidado(e.target.value)}
      placeholder="Seu nome"
      className="mb-3 w-full border-b border-dourado/50 bg-transparent pb-2 text-center text-sm text-vinho placeholder:text-vinho/40 focus:border-dourado focus:outline-none"
    />
    <textarea
      rows={2}
      value={mensagemPresente}
      onChange={(e) => setMensagemPresente(e.target.value)}
      placeholder="Deixe um recadinho (opcional)"
      className="mb-4 w-full resize-none border border-dourado/30 bg-transparent p-2 text-xs text-vinho placeholder:text-vinho/40 focus:border-dourado/60 focus:outline-none"
    />

    {erro && <p className="mb-3 text-xs text-red-800">{erro}</p>}

    <button
      type="button"
      onClick={pagarMercadoPago}
      disabled={carregando}
      className="w-full bg-[#A48255] px-4 py-3 font-apoio text-[9px] tracking-[0.2em] text-[#F5EEE4] transition hover:bg-[#8c6b41] disabled:opacity-60"
    >
      {carregando ? 'ABRINDO PAGAMENTO...' : 'PRESENTEAR COM MERCADO PAGO'}
    </button>
    <p className="mt-2 text-[10px] text-vinho/60">
      Pagamento seguro por Pix ou cartão.
    </p>
  </>
) : (
  <>
    <p className="mb-3 text-sm italic text-vinho/80">
      O valor deste item ainda será confirmado. Fale com a gente e combinamos.
    </p>
    <a
      href={`https://wa.me/${WHATSAPP}?text=${mensagemWhats}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full border border-dourado/70 px-4 py-3 font-apoio text-[9px] tracking-[0.2em] text-dourado transition hover:bg-dourado/10"
    >
      FALAR NO WHATSAPP
    </a>
  </>
)}
          </div>
        </div>
      )}
    </div>
  );
}
