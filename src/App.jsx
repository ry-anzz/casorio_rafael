import React, { useState } from 'react';

import ilustracaoCapa from './assets/01_Capa__floral_principal.png';
import ilustracaoHistoria from './assets/02_Nossa_Historia__floral_direita.png';
import ilustracaoRSVP from './assets/03_Lista_Presenca__floral_direita.png';
import ilustracaoRamo from './assets/03_Lista_Presenca__ramo_dourado_com_linha.png';
import monogramaIR from './assets/01_Capa__monograma.png';

function MonogramaIR({ className = '' }) {
  return (
    <img
      src={monogramaIR}
      alt="Isabella e Rafael"
      className={`object-contain mix-blend-darken ${className}`}
    />
  );
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

    // Aqui entra a integração com Supabase/API:
    // await supabase.from('rsvp').insert([rsvp]);

    setEnviado(true);
  };

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
          <a
            href="#inicio"
            onClick={() => setIsSidebarOpen(false)}
            className="transition hover:text-dourado"
          >
            INÍCIO
          </a>

          <a
            href="#historia"
            onClick={() => setIsSidebarOpen(false)}
            className="transition hover:text-dourado"
          >
            NOSSA HISTÓRIA
          </a>

          <a
            href="#rsvp"
            onClick={() => setIsSidebarOpen(false)}
            className="transition hover:text-dourado"
          >
            PRESENÇA
          </a>

          <a
            href="#presentes"
            onClick={() => setIsSidebarOpen(false)}
            className="transition hover:text-dourado"
          >
            LISTA DE PRESENTES
          </a>

          <a
            href="#mensagens"
            onClick={() => setIsSidebarOpen(false)}
            className="transition hover:text-dourado"
          >
            MENSAGENS
          </a>
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
              <p>
                A nossa história começou em 2018, quando nos conhecemos através de amigos em comum da faculdade.
              </p>

              <p>
                Desde o início, havia interesse e uma conexão entre nós. Mas, naquele momento, não existia ainda o compromisso ou o envolvimento necessário para construirmos uma vida juntos. Seguimos nossos caminhos, mantendo entre nós uma história que, de alguma forma, nunca deixou de existir.
              </p>

              <p>
                Em 2022, a vida nos aproximou novamente. Diante de um período delicado e de muitas mudanças, percebemos que já não queríamos viver a nossa relação da mesma maneira. Escolhemos nos aproximar de verdade, com intenção, compromisso e disposição para construir uma vida juntos.
              </p>

              <p>
                Foi preciso mudar muitas coisas. Passamos a dividir mais do que os momentos bons: dividimos decisões, responsabilidades, planos, medos e sonhos. Aos poucos, fomos entendendo que estar juntos significava escolher um ao outro também nos dias difíceis.
              </p>

              <p>
                A perda que vivemos naquele período transformou profundamente a nossa maneira de enxergar a vida e o nosso relacionamento. Diante dela, encontramos um no outro companhia, cuidado e força para seguir. E foi nesse caminho, construído com presença e entrega, que o nosso amor se tornou cada vez mais sólido.
              </p>

              <p>
                Hoje, olhando para trás, reconhecemos que a bondade e o amor do Senhor estiveram presentes em cada etapa da nossa história. Nos encontros, nos reencontros, nas mudanças e também nos momentos que não escolhemos viver, Deus nos sustentou e conduziu os nossos passos.
              </p>
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

      {/* RSVP */}
      <section
        id="rsvp"
        className="relative overflow-hidden bg-[#E9DFD3] py-12 md:min-h-screen md:py-24 lg:py-28"
      >
        <div className="relative z-10 mx-auto w-full max-w-sm px-5 md:max-w-5xl md:px-12">
          <div className="flex items-stretch gap-2 md:gap-10">

            {/* CONTEÚDO: 62% no celular, 58% no desktop */}
            <div className="w-[62%] min-w-0 md:w-[58%]">

              {/* CABEÇALHO RSVP */}
              <div className="text-center">
                <div className="flex justify-center">
                  <MonogramaIR className="h-6 w-9 md:h-12 md:w-16" />
                </div>

                <div className="mx-auto my-2 h-px w-8 bg-dourado/50 md:my-4 md:w-16" />

                <p className="font-apoio text-[6px] tracking-[0.25em] text-vinho/70 md:text-[10px] md:tracking-[0.4em]">
                  RSVP
                </p>

                <h2 className="mt-2 text-[17px] font-light leading-tight tracking-[0.08em] text-dourado md:mt-4 md:text-5xl md:tracking-widest lg:text-6xl">
                  CONFIRME SUA
                  <br />
                  PRESENÇA
                </h2>

                <p className="mt-2 text-[9px] italic leading-snug text-dourado md:mt-4 md:text-xl">
                  Sua presença tornará esse dia ainda mais especial.
                </p>

                <p className="mt-1 font-apoio text-[6px] tracking-[0.18em] text-vinho/70 md:mt-2 md:text-[10px] md:tracking-[0.3em]">
                  ATÉ 10 DE NOVEMBRO DE 2026
                </p>

                <div className="mx-auto mt-3 h-px w-8 bg-dourado/50 md:mt-6 md:w-16" />
              </div>

              {/* SAUDAÇÃO */}
              <div className="mt-5 md:mt-12">
                <h3 className="text-[18px] italic text-dourado md:text-4xl">
                  Isabella e Rafael,
                </h3>

                <p className="mt-1 text-[8px] leading-snug text-vinho/80 md:text-base">
                  queremos muito celebrar este dia ao seu lado.
                </p>
              </div>

              {/* DATA E LOCAL */}
              <div className="mt-4 flex flex-col items-center gap-1 font-apoio text-[6px] tracking-[0.16em] text-vinho/80 md:mt-8 md:gap-2 md:text-xs md:tracking-[0.3em]">
                <p>📅 17 DE JANEIRO DE 2027 · 16H</p>
                <p>📍 SERRA DOS CRISTAIS</p>
              </div>

              {/* FORMULÁRIO */}
              <form
                onSubmit={handleSubmitRsvp}
                className="mt-6 space-y-4 md:mt-14 md:space-y-10"
              >

                {/* PRESENÇA */}
                <div>
                  <p className="mb-1.5 font-apoio text-[8px] tracking-wide text-vinho md:mb-3 md:text-base">
                    Você estará conosco?
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 md:gap-4">
                    {[
                      { valor: 'sim', label: 'SIM, ESTAREI PRESENTE' },
                      { valor: 'nao', label: 'NÃO PODEREI COMPARECER' },
                    ].map((op) => {
                      const ativo = rsvp.presenca === op.valor;

                      return (
                        <button
                          type="button"
                          key={op.valor}
                          onClick={() => {
                            setRsvp({ ...rsvp, presenca: op.valor });
                          }}
                          className={`flex min-h-[34px] items-center gap-1 rounded-sm border px-1.5 py-2 text-left font-apoio text-[5.5px] leading-tight tracking-[0.07em] text-vinho transition md:min-h-[64px] md:gap-2 md:px-5 md:py-3 md:text-[10px] md:tracking-[0.14em] ${
                            ativo
                              ? 'border-dourado bg-dourado/15'
                              : 'border-dourado/40 hover:border-dourado'
                          }`}
                        >
                          <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full border border-dourado md:h-4 md:w-4">
                            {ativo && (
                              <span className="h-1 w-1 rounded-full bg-dourado md:h-2 md:w-2" />
                            )}
                          </span>

                          {op.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ACOMPANHANTES */}
                {rsvp.presenca === 'sim' && (
                  <div>
                    <p className="mb-1 font-apoio text-[8px] tracking-wide text-vinho md:mb-0 md:text-base">
                      Quem estará conosco?
                    </p>

                    <p className="mb-1.5 text-[6px] text-vinho/70 md:mb-3 md:mt-1 md:text-xs">
                      Selecione os nomes dos acompanhantes (se houver).
                    </p>

                    <div className="flex flex-wrap gap-1.5 md:gap-3">
                      {['Isabella', 'Rafael'].map((nome) => {
                        const ativo = rsvp.acompanhantes.includes(nome);

                        return (
                          <button
                            type="button"
                            key={nome}
                            onClick={() => toggleAcompanhante(nome)}
                            className={`flex items-center gap-1 rounded-sm border px-2 py-1.5 text-[6px] text-vinho transition md:gap-2 md:px-4 md:py-3 md:text-xs ${
                              ativo
                                ? 'border-dourado bg-dourado/15'
                                : 'border-dourado/40 hover:border-dourado'
                            }`}
                          >
                            <span
                              className={`flex h-2.5 w-2.5 items-center justify-center border border-dourado text-[6px] text-white md:h-4 md:w-4 md:text-[10px] ${
                                ativo ? 'bg-dourado' : ''
                              }`}
                            >
                              {ativo && '✓'}
                            </span>

                            {nome}
                          </button>
                        );
                      })}

                      <input
                        type="text"
                        value={rsvp.outroAcompanhante}
                        onChange={(e) => {
                          setRsvp({
                            ...rsvp,
                            outroAcompanhante: e.target.value,
                          });
                        }}
                        placeholder="Nome do acompanhante"
                        className="min-w-0 flex-1 rounded-sm border border-dourado/40 bg-transparent px-2 py-1.5 text-[6px] text-vinho placeholder:text-vinho/40 focus:border-dourado focus:outline-none md:min-w-[145px] md:px-4 md:py-3 md:text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* RESTRIÇÃO ALIMENTAR */}
                <div>
                  <p className="font-apoio text-[8px] tracking-wide text-vinho md:text-base">
                    Há alguma restrição alimentar que devemos considerar?
                  </p>

                  <p className="mb-1.5 mt-1 text-[6px] text-vinho/70 md:mb-3 md:text-xs">
                    Conte-nos, se houver. (Opcional)
                  </p>

                  <textarea
                    rows={2}
                    value={rsvp.restricao}
                    onChange={(e) => {
                      setRsvp({
                        ...rsvp,
                        restricao: e.target.value,
                      });
                    }}
                    placeholder="Digite aqui..."
                    className="w-full resize-none rounded-sm border border-dourado/40 bg-transparent p-2 text-[7px] text-vinho placeholder:text-vinho/40 focus:border-dourado focus:outline-none md:p-3 md:text-xs"
                  />
                </div>

                {/* RAMO + FRASE */}
                <div className="flex items-center gap-1.5 md:gap-5">
                  <img
                    src={ilustracaoRamo}
                    alt=""
                    className="h-8 w-auto shrink-0 object-contain mix-blend-darken md:h-20"
                  />

                  <p className="text-[9px] italic leading-snug text-dourado md:text-xl">
                    Será uma alegria ter você conosco.
                  </p>
                </div>

                {/* BOTÃO */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-dourado px-4 py-2 font-apoio text-[6px] tracking-[0.16em] text-[#F5EEE4] transition hover:opacity-90 md:px-10 md:py-4 md:text-[10px] md:tracking-[0.25em]"
                  >
                    CONFIRMAR PRESENÇA &nbsp;→
                  </button>
                </div>
              </form>

              {/* CONFIRMAÇÃO */}
              {enviado && (
                <div className="mt-6 border-t border-dourado/30 pt-5 md:mt-14 md:pt-8">
                  <div className="relative rounded-sm border border-dourado/40 px-3 pb-4 pt-5 text-center md:px-10 md:pb-8 md:pt-10">
                    <div className="absolute -top-2 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-dourado bg-[#E9DFD3] text-[7px] text-dourado md:-top-3 md:h-6 md:w-6 md:text-xs">
                      ✓
                    </div>

                    <p className="font-apoio text-[6px] tracking-[0.16em] text-vinho md:text-[10px] md:tracking-[0.3em]">
                      PRESENÇA CONFIRMADA!
                    </p>

                    <p className="mt-2 text-[6px] text-vinho/80 md:mt-3 md:text-xs">
                      Estamos muito felizes em compartilhar esse momento com você.
                    </p>

                    <p className="mt-1 text-[6px] italic text-vinho/80 md:mt-2 md:text-xs">
                      Nos vemos em 17 de janeiro. ♥
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* FLOR RSVP: inteira no lado direito */}
            <div className="relative w-[38%] bg-[#E9DFD3] md:w-[42%]">
              <img
                src={ilustracaoRSVP}
                alt="Ilustração floral da confirmação de presença"
                className="absolute inset-0 h-full w-full object-cover object-top mix-blend-darken"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;