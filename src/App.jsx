import React, { useState, useEffect } from 'react';

import ilustracaoCapa from './assets/01_Capa__floral_principal.png';
import ilustracaoHistoria from './assets/02_Nossa_Historia__floral_direita.png';
import ilustracaoRSVP from './assets/03_Lista_Presenca__floral_direita.png';
import ilustracaoRamo from './assets/03_Lista_Presenca__ramo_dourado_com_linha.png';
import monogramaIR from './assets/01_Capa__monograma.png';
import ilustracaoCerimoniaFlor from './assets/04_Cerimonia__flor_topo_direita.png';
import ilustracaoLocal from './assets/04_Cerimonia__local.png';
import ilustracaoMapa from './assets/04_Cerimonia__mapa.png';
import ilustracaoFolhagem from './assets/04_Cerimonia__folhagem_canto.png';

function MonogramaIR({ className = '' }) {
  return (
    <img
      src={monogramaIR}
      alt="Isabella e Rafael"
      className={`object-contain mix-blend-darken ${className}`}
    />
  );
}

// Ícones minimalistas para Data e Local
const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
);

const PinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
  </svg>
);

const CarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 16v2m14-2v2M3 13l2-6h14l2 6v3H3v-3Z" />
    <circle cx="7.5" cy="13.5" r="0.8" />
    <circle cx="16.5" cy="13.5" r="0.8" />
  </svg>
);

const BedIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18V6m0 8h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5a1.5 1.5 0 1 0 0-.01" />
  </svg>
);

const LeafIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9m0 4c-3 0-5-2-5-5 3 0 5 2 5 5Zm0-2c0-3 2-5 5-5 0 3-2 5-5 5Zm0-4c0-2 1-3 2-4-1 0-2 1-2 4Z" />
  </svg>
);

const MapIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14" />
  </svg>
);

const informacoes = [
  {
    icone: ClockIcon,
    titulo: 'HORÁRIO DE CHEGADA',
    texto: 'Recomendamos que os convidados cheguem com pelo menos 30 minutos de antecedência para aproveitar o momento da cerimônia.',
  },
  {
    icone: CarIcon,
    titulo: 'ESTACIONAMENTO',
    texto: 'O local possui estacionamento no próprio espaço, com fácil acesso e sinalização no dia do evento.',
  },
  {
    icone: BedIcon,
    titulo: 'HOSPEDAGEM',
    texto: 'Para quem deseja se hospedar, sugerimos os hotéis próximos a Jundiaí. Em breve, compartilharemos uma lista de opções com todos.',
  },
  {
    icone: LeafIcon,
    titulo: 'OUTRAS ORIENTAÇÕES',
    texto: 'O evento será realizado ao ar livre, em um ambiente rodeado pela natureza. Recomendamos roupas confortáveis e, se possível, levar um casaquinho para a noite.',
  },
];

const DATA_CASAMENTO = new Date('2027-01-17T16:00:00-03:00');

function useContagem(alvo) {
  const calcular = () => {
    const diff = Math.max(0, alvo.getTime() - Date.now());
    return {
      dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diff / (1000 * 60)) % 60),
      segundos: Math.floor((diff / 1000) % 60),
    };
  };

  const [tempo, setTempo] = useState(calcular);

  useEffect(() => {
    const id = setInterval(() => setTempo(calcular()), 1000);
    return () => clearInterval(id);
  }, []);

  return tempo;
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [rsvp, setRsvp] = useState({
    presenca: 'sim',
    acompanhantes: ['Isabella'],
    outroAcompanhante: '',
    restricao: '',
  });

  const [enviado, setEnviado] = useState(false);

  const toggleAcompanhante = (nome) => {
    setRsvp((prev) => ({
      ...prev,
      acompanhantes: prev.acompanhantes.includes(nome)
        ? prev.acompanhantes.filter((n) => n !== nome)
        : [...prev.acompanhantes, nome],
    }));
  };

  const handleSubmitRsvp = (e) => {
    e.preventDefault();
    console.log('RSVP:', rsvp);
    // Integração com Supabase/API aqui
    setEnviado(true);
  };

  const tempo = useContagem(DATA_CASAMENTO);

const unidades = [
  { valor: tempo.dias, label: 'DIAS' },
  { valor: tempo.horas, label: 'HORAS' },
  { valor: tempo.minutos, label: 'MINUTOS' },
  { valor: tempo.segundos, label: 'SEGUNDOS' },
];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#E9DFD3] text-vinho font-principal">

      {/* NAVBAR */}
      <nav className="relative flex w-full items-center justify-between p-8">
        <div className="w-10" />

        <MonogramaIR className="z-10 h-9 w-12 md:h-11 md:w-16" />

        <div className="z-10 flex w-10 justify-end">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Abrir menu"
            className="group flex cursor-pointer flex-col space-y-1.5 p-2"
          >
            <span className="h-px w-6 bg-vinho transition-colors group-hover:bg-dourado" />
            <span className="h-px w-6 bg-vinho transition-colors group-hover:bg-dourado" />
            <span className="h-px w-6 bg-vinho transition-colors group-hover:bg-dourado" />
          </button>
        </div>
      </nav>

      <div className="h-px w-full bg-dourado/20" />

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-vinho/10 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-dourado/20 bg-[#E3D8C8] px-8 pt-12 shadow-2xl transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Fechar menu"
          className="absolute right-8 top-8 text-2xl text-vinho transition-colors hover:text-dourado"
        >
          &#10005;
        </button>

        <div className="mb-12 mt-4 flex justify-center">
          <MonogramaIR className="h-10 w-14" />
        </div>

        <nav className="flex flex-col space-y-8 text-center font-apoio text-sm tracking-[0.2em] text-vinho/80">
          <a href="#inicio" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-dourado">INÍCIO</a>
          <a href="#historia" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-dourado">NOSSA HISTÓRIA</a>
          <a href="#cerimonia" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-dourado">CERIMÔNIA</a>
          <a href="#rsvp" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-dourado">PRESENÇA</a>
          <a href="#contagem" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-dourado">CONTAGEM REGRESSIVA</a>
          <a href="#presentes" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-dourado">LISTA DE PRESENTES</a>
          <a href="#mensagens" onClick={() => setIsSidebarOpen(false)} className="transition hover:text-dourado">MENSAGENS</a>
        </nav>
      </aside>

      {/* CAPA */}
      <section
        id="inicio"
        className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center"
      >
        <h1 className="mb-4 mt-8 text-5xl font-light tracking-widest md:text-7xl">
          ISABELLA
          <br className="md:hidden" />
          <span className="mx-4 text-3xl italic text-dourado md:text-5xl">&</span>
          <br className="md:hidden" />
          RAFAEL
        </h1>

        <div className="my-8 h-px w-16 bg-dourado" />

        <p className="mb-3 font-apoio text-xs tracking-[0.25em] text-vinho/80 md:text-base">
          17 DE JANEIRO DE 2027
        </p>

        <p className="font-apoio text-xs tracking-[0.25em] text-vinho/80 md:text-base">
          SERRA DOS CRISTAIS
        </p>

        <div className="mt-12 flex w-full items-center justify-center bg-[#E9DFD3]">
          <img
            src={ilustracaoCapa}
            alt="Ilustração floral"
            className="inset-0 w-72 translate-x-[-52px] object-cover object-top mix-blend-darken md:w-96"
          />
        </div>
      </section>

      {/* NOSSA HISTÓRIA */}
      <section
        id="historia"
        className="relative overflow-hidden bg-[#E9DFD3] py-16 md:py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-sm bg-[#E9DFD3] px-6 md:max-w-4xl md:px-12 lg:max-w-5xl lg:px-16">
          <div className="relative z-20 mb-6 text-center md:mb-12">
            <div className="mb-3 flex justify-center md:mb-5">
              <MonogramaIR className="h-8 w-11 md:h-11 md:w-14" />
            </div>

            <h2 className="font-apoio text-2xl tracking-widest text-dourado md:text-4xl lg:text-5xl">
              NOSSA HISTÓRIA
            </h2>
          </div>

          <div className="flex items-stretch gap-2 md:gap-8 lg:gap-12">
            <div className="w-[55%] space-y-1.5 text-left text-[8.5px] leading-snug text-vinho md:w-[58%] md:space-y-5 md:text-sm md:leading-relaxed lg:text-[15px]">
              <p>A nossa história começou em 2018, quando nos conhecemos através de amigos em comum da faculdade.</p>
              <p>Desde o início, havia interesse e uma conexão entre nós. Mas, naquele momento, não existia ainda o compromisso ou o envolvimento necessário para construirmos uma vida juntos. Seguimos nossos caminhos, mantendo entre nós uma história que, de alguma forma, nunca deixou de existir.</p>
              <p>Em 2022, a vida nos aproximou novamente. Diante de um período delicado e de muitas mudanças, percebemos que já não queríamos viver a nossa relação da mesma maneira. Escolhemos nos aproximar de verdade, com intenção, compromisso e disposição para construir uma vida juntos.</p>
              <p>Foi preciso mudar muitas coisas. Passamos a dividir mais do que os momentos bons: dividimos decisões, responsabilidades, planos, medos e sonhos. Aos poucos, fomos entendendo que estar juntos significava escolher um ao outro também nos dias difíceis.</p>
              <p>A perda que vivemos naquele período transformou profundamente a nossa maneira de enxergar a vida e o nosso relacionamento. Diante dela, encontramos um no outro companhia, cuidado e força para seguir. E foi nesse caminho, construído com presença e entrega, que o nosso amor se tornou cada vez mais sólido.</p>
              <p>Hoje, olhando para trás, reconhecemos que a bondade e o amor do Senhor estiveram presentes em cada etapa da nossa história. Nos encontros, nos reencontros, nas mudanças e também nos momentos que não escolhemos viver, Deus nos sustentou e conduziu os nossos passos.</p>
            </div>

            <div className="relative w-[45%] bg-[#E9DFD3] md:w-[42%]">
              <img
                src={ilustracaoHistoria}
                alt="Ilustração floral da nossa história"
                className="absolute inset-0 h-full w-full object-cover object-top mix-blend-darken"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CERIMÔNIA */}
<section
  id="cerimonia"
  className="relative overflow-hidden bg-[#E9DFD3] py-16 md:py-24"
>
  {/* Flor no topo direito */}
  <img
    src={ilustracaoCerimoniaFlor}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute right-0 top-0 z-0 w-[22%] max-w-[10rem] mix-blend-darken md:w-[14%]"
  />

  {/* Folhagem no canto inferior esquerdo */}
  <img
    src={ilustracaoFolhagem}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute bottom-0 left-0 z-0 w-[26%] max-w-[12rem] mix-blend-darken md:w-[15%]"
  />

  <div className="relative z-10 mx-auto w-full max-w-md px-6 md:max-w-5xl md:px-12">

    {/* CABEÇALHO */}
    <div className="mb-8 text-center md:mb-12">
      <div className="mb-4 flex justify-center">
        <MonogramaIR className="h-6 w-9 md:h-8 md:w-11" />
      </div>
      <div className="mx-auto mb-6 h-px w-20 bg-dourado/40" />

      <p className="font-apoio text-[10px] tracking-[0.3em] text-vinho/70 md:text-sm">
        CASAMENTO
      </p>
      <h2 className="mt-2 text-2xl font-light leading-tight tracking-[0.08em] text-dourado md:text-5xl">
        17 DE JANEIRO DE 2027
      </h2>
      <p className="mt-3 font-apoio text-[9px] tracking-[0.3em] text-vinho/70 md:text-xs">
        ÀS 16 HORAS
      </p>

      <div className="mx-auto my-6 h-px w-20 bg-dourado/40" />

      <h3 className="text-2xl italic text-dourado md:text-4xl">Serra dos Cristais</h3>
      <p className="mt-2 font-apoio text-[9px] tracking-[0.3em] text-vinho/70 md:text-xs">
        JUNDIAÍ · SÃO PAULO
      </p>
    </div>

    {/* ILUSTRAÇÃO DO LOCAL */}
    <div className="-mx-6 mb-10 bg-[#E9DFD3] md:mx-0 md:mb-16">
      <img
        src={ilustracaoLocal}
        alt="Ilustração do local da cerimônia, Serra dos Cristais"
        className="w-full object-contain mix-blend-darken"
      />
    </div>

    {/* COMO CHEGAR */}
<div className="mb-10 flex flex-row items-center bg-[#E9DFD3] gap-3 md:mb-16 md:gap-10">
  <div className="w-1/2">
    <div className="mb-3 flex bg-[#E9DFD3] items-center gap-2 md:mb-4 md:gap-3">
      <div className="h-px bg-[#E9DFD3] w-4 bg-dourado/60 md:w-8" />
      <h3 className="text-base italic text-dourado md:text-3xl">Como chegar</h3>
    </div>

    <div className="mb-3 flex bg-[#E9DFD3] items-start gap-2 md:mb-5 md:gap-3">
      <PinIcon className="mt-0.5 h-3 w-3 shrink-0 text-dourado md:h-4 md:w-4" />
      <p className="text-[9px] leading-snug text-vinho md:text-base md:leading-relaxed">
        Rod. Pres. Tancredo de Almeida Neves, 861
        <br />
        Jundiaí — SP
      </p>
    </div>

    <a
      href="https://www.google.com/maps/search/?api=1&query=Rod.+Pres.+Tancredo+de+Almeida+Neves,+861,+Jundiaí+-+SP"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-dourado/50 px-2.5 py-2 font-apoio text-[7px] tracking-[0.15em] text-dourado transition hover:bg-dourado/10 md:gap-3 md:px-5 md:py-3 md:text-[10px] md:tracking-[0.2em]"
    >
      <MapIcon className="h-3 w-3 md:h-4 md:w-4" />
      ABRIR NO MAPA
      <span aria-hidden="true">→</span>
    </a>
  </div>

  <div className="w-1/2 overflow-hidden bg-[#E9DFD3] rounded-md border border-dourado/30">
    <img
      src={ilustracaoMapa}
      alt="Mapa de localização"
      className="h-full w-full object-cover"
    />
  </div>
</div>

{/* INFORMAÇÕES IMPORTANTES */}
<div className="mb-10">
  <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
    <div className="h-px flex-1 bg-dourado/30" />
    <h3 className="text-sm italic text-dourado md:text-3xl">Informações importantes</h3>
    <div className="h-px flex-1 bg-dourado/30" />
  </div>

  <div className="grid grid-cols-4">
    {informacoes.map((info, i) => {
      const Icone = info.icone;
      return (
        <div
          key={info.titulo}
          className={`flex flex-col items-center px-1.5 text-center md:px-5 ${
            i > 0 ? 'border-l border-dourado/20' : ''
          }`}
        >
          <Icone className="mb-2 h-4 w-4 text-dourado md:mb-3 md:h-6 md:w-6" />
          <p className="mb-2 font-apoio text-[5.5px] leading-tight tracking-[0.08em] text-vinho md:mb-3 md:text-[10px] md:tracking-[0.15em]">
            {info.titulo}
          </p>
          <p className="text-[6.5px] leading-snug text-vinho/80 md:text-xs md:leading-relaxed">
            {info.texto}
          </p>
        </div>
      );
    })}
  </div>
</div>

    {/* FRASE FINAL */}
    <div className="text-center">
      <p className="text-sm italic bg-[#E9DFD3] text-dourado md:text-lg">
        Será um privilégio ter você conosco neste dia tão especial.
      </p>
      <div className="mx-auto mt-6 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-dourado/40" />
        <LeafIcon className="h-4 w-4 text-dourado" />
        <div className="h-px w-12 bg-dourado/40" />
      </div>
    </div>
  </div>
</section>

      {/* RSVP (FORMULÁRIO FULL-WIDTH E FLOR PEQUENA NO CANTO) */}
      {/* RSVP (AJUSTADO PARA MOBILE) */}
      <section
        id="rsvp"
        className="relative overflow-hidden bg-[#E9DFD3] py-16 md:py-24"
      >
{/* FLOR FIXADA NO CANTO INFERIOR DIREITO */}
<div className="pointer-events-none bg-[#E9DFD3] absolute bottom-[4%] right-0 z-0 w-[34%] md:w-[24%]">
  <img
    src={ilustracaoRSVP}
    alt="Flor Calla Lily"
    className="w-full translate-x-[22%] object-contain object-bottom opacity-95 mix-blend-darken"
  />
</div>

        {/* CONTAINER CENTRALIZADO (Para telas pequenas será max-w-md, para grandes max-w-2xl) */}
        <div className="relative z-10 mx-auto w-full max-w-md px-8 md:max-w-3xl md:px-12">
          
          {/* CABEÇALHO (100% da largura, perfeitamente centralizado) */}
          <div className="text-center mb-10 w-full">
            <div className="flex justify-center mb-4">
              <MonogramaIR className="h-6 w-9 md:h-8 md:w-11" />
            </div>
            <p className="font-apoio text-[10px] md:text-xs tracking-[0.3em] text-vinho/70 mb-2">
              RSVP
            </p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-[0.08em] text-dourado">
              CONFIRME SUA<br />PRESENÇA
            </h2>
            
            <div className="mx-auto mt-6 h-px w-16 bg-dourado/40" />
          </div>

          {/* SAUDAÇÃO E FORMULÁRIO */}
<div className="flex w-full flex-col">

  {/* Saudação */}
<div className="mb-8 w-full text-center">
  <h3 className="mb-1 text-[24px] italic text-dourado md:text-[32px]">
    Isabella e Rafael,
  </h3>
  <p className="mb-6 text-[11px] text-vinho/80 md:text-[13px]">
    queremos muito celebrar este dia ao seu lado.
  </p>

  <div className="flex flex-col items-center gap-2 font-apoio text-[9px] tracking-[0.25em] text-vinho/80 md:text-[11px]">
    <div className="flex items-center gap-2">
      <CalendarIcon className="h-3.5 w-3.5 text-dourado" />
      <span>17 DE JANEIRO DE 2027 &nbsp;·&nbsp; 16H</span>
    </div>
    <div className="flex items-center gap-2">
      <PinIcon className="h-3.5 w-3.5 text-dourado" />
      <span>SERRA DOS CRISTAIS</span>
    </div>
  </div>
</div>

  {/* Formulário */}
  <form id="form-rsvp" onSubmit={handleSubmitRsvp} className="w-full space-y-6 pb-6">

    {/* Você estará conosco? */}
    <div className="w-full text-left">
      <p className="mb-2 text-[11px] font-bold text-vinho md:text-xs">
        Você estará conosco?
      </p>
      <div className="flex w-full flex-col gap-2.5 md:flex-row">
        {[
          { valor: 'sim', label: 'SIM, ESTAREI PRESENTE' },
          { valor: 'nao', label: 'NÃO PODEREI COMPARECER' },
        ].map((op) => {
          const ativo = rsvp.presenca === op.valor;
          return (
            <button
              type="button"
              key={op.valor}
              onClick={() => setRsvp({ ...rsvp, presenca: op.valor })}
              className={`flex w-full flex-1 items-center justify-start gap-3 rounded-md border px-3 py-3 font-apoio text-[9px] tracking-[0.1em] transition md:text-[10px] ${
                ativo
                  ? 'border-dourado/50 bg-[#E8DCC8] text-vinho shadow-sm'
                  : 'border-dourado/30 bg-transparent text-vinho/60 hover:border-dourado/50'
              }`}
            >
              <div className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors ${ativo ? 'border-dourado' : 'border-dourado/40'}`}>
                {ativo && <div className="h-1.5 w-1.5 rounded-full bg-[#A48255]" />}
              </div>
              {op.label}
            </button>
          );
        })}
      </div>
    </div>

    {/* Quem estará conosco? */}
    {rsvp.presenca === 'sim' && (
      <div className="w-full text-left">
        <p className="mb-1 text-[11px] font-bold text-vinho md:text-xs">
          Quem estará conosco?
        </p>
        <p className="mb-3 text-[10px] text-vinho/70 md:text-[11px]">
          Selecione os nomes dos acompanhantes (se houver).
        </p>
        <div className="flex w-full flex-wrap gap-2.5 md:flex-nowrap">
          {['Isabella', 'Rafael'].map((nome) => {
            const ativo = rsvp.acompanhantes.includes(nome);
            return (
              <button
                type="button"
                key={nome}
                onClick={() => toggleAcompanhante(nome)}
                className={`flex min-w-[40%] flex-1 items-center gap-2 rounded-md border px-3 py-2.5 text-[11px] transition md:min-w-0 md:flex-none md:px-6 md:text-xs ${
                  ativo
                    ? 'border-dourado/50 bg-[#E8DCC8] text-vinho shadow-sm'
                    : 'border-dourado/30 bg-transparent text-vinho/60 hover:border-dourado/50'
                }`}
              >
                <div className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-[2px] border transition-colors ${
                  ativo ? 'border-dourado bg-[#A48255] text-white' : 'border-dourado/40 bg-transparent text-transparent'
                }`}>
                  <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {nome}
              </button>
            );
          })}

          {/* Acompanhante extra */}
<div className="flex w-full items-center gap-2 rounded-md border border-dourado/30 bg-[#E9DFD3]/60 px-3 py-2.5 text-[11px] transition-colors focus-within:border-dourado/60 md:w-auto md:flex-1 md:text-xs">
            <div className="h-3 w-3 shrink-0 rounded-[2px] border border-dourado/40 bg-transparent" />
            <input
              type="text"
              value={rsvp.outroAcompanhante}
              onChange={(e) => setRsvp({ ...rsvp, outroAcompanhante: e.target.value })}
              placeholder="Nome do acompanhante"
              className="w-full bg-transparent text-vinho placeholder:text-vinho/40 focus:outline-none"
            />
          </div>
        </div>
      </div>
    )}

  </form>
</div>

          {/* RAMO, FRASE FINAL E BOTÃO (Centralizados no meio da tela) */}
          <div className="mt-8 flex flex-col items-center justify-center w-full relative z-20">
            <div className="flex items-center bg-[#E9DFD3] justify-center gap-3 mb-6">
              <img
                src={ilustracaoRamo}
                alt="Ramo dourado decorativo"
                className="h-5 md:h-6 w-auto object-contain mix-blend-darken"
              />
              <p className="text-[14px] md:text-base italic text-dourado leading-tight">
                Será uma alegria ter você conosco.
              </p>
            </div>

            <button
  type="submit"
  form="form-rsvp"
  className="rounded-md bg-[#A48255] px-8 py-3.5 font-apoio text-[9px] tracking-[0.2em] text-[#F5EEE4] shadow-sm transition hover:bg-[#8c6b41] md:text-[10px]"
>
  CONFIRMAR PRESENÇA &nbsp;→
</button>
          </div>

          {/* CAIXA DE CONFIRMAÇÃO */}
          {enviado && (
            <div className="relative mt-16 w-full md:w-[85%] mx-auto">
              <div className="w-full h-[1px] bg-dourado/30 mb-8" />
              
              <div className="relative rounded-md border border-dourado/30 bg-transparent px-4 pb-6 pt-8 text-center mx-auto w-full">
                <div className="absolute -top-3.5 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-dourado/50 bg-[#E9DFD3] text-[#A48255]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-apoio text-[10px] md:text-[12px] tracking-[0.2em] text-vinho mb-2">
                  PRESENÇA CONFIRMADA!
                </p>
                <p className="text-[10px] md:text-xs text-vinho/80 mb-1.5">
                  Estamos muito felizes em compartilhar esse momento com você.
                </p>
                <p className="text-[10px] md:text-xs italic text-vinho/80">
                  Nos vemos em 17 de janeiro. ♥
                </p>
              </div>
            </div>
          )}

        </div>
      </section>
{/* CONTAGEM REGRESSIVA */}
<section
  id="contagem"
  className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#E9DFD3] py-16"
>
  {/* Flor topo esquerda */}
  <img
    src={ilustracaoCapa}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute left-0 top-0 z-0 w-[50%] max-w-[22rem] -translate-x-[36%] mix-blend-darken md:w-[24%]"
  />

  {/* Flor base direita */}
  <img
    src={ilustracaoRSVP}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute bottom-0 right-0 z-0 w-[42%] max-w-[26rem] translate-x-[4%] mix-blend-darken md:w-[26%]"
  />

  {/* Linhas douradas decorativas */}
  <div className="pointer-events-none absolute left-[3.5%] top-[2%] h-[26%] w-px bg-dourado/50" />
  <div className="pointer-events-none absolute bottom-[3%] right-[3.5%] h-[22%] w-px bg-dourado/50" />

  {/* Monograma + linha */}
  <div className="relative z-10 flex flex-col items-center">
    <MonogramaIR className="h-9 w-12 md:h-12 md:w-16" />
    <div className="mt-4 h-px w-16 bg-dourado/50 md:w-20" />
  </div>

  {/* Contador */}
  <div className="relative z-10 my-auto flex w-full items-start justify-center px-4 md:px-8">
    {unidades.map((u, i) => (
      <React.Fragment key={u.label}>
        <div className="flex flex-col items-center">
          <div className="flex h-[4.5rem] w-14 items-center justify-center rounded-lg border border-dourado/20 bg-[#EDE3D6] shadow-[0_2px_6px_rgba(120,90,50,0.15)] md:h-32 md:w-28">
            <span className="text-[2rem] font-light leading-none text-dourado md:text-7xl">
              {String(u.valor).padStart(2, '0')}
            </span>
          </div>
          <span className="mt-3 font-apoio text-[6.5px] tracking-[0.2em] text-vinho/70 md:text-xs md:tracking-[0.3em]">
            {u.label}
          </span>
        </div>

        {i < unidades.length - 1 && (
          <div className="flex h-[4.5rem] w-4 items-center justify-center md:h-32 md:w-10">
            <span className="h-1 w-1 rounded-full bg-dourado md:h-1.5 md:w-1.5" />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>

  {/* Espaçador para manter o contador centralizado verticalmente */}
  <div className="h-[3.5rem]" aria-hidden="true" />
</section>

    </div>
  );
}

export default App;