import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MonogramaIR from './components/MonogramaIR';
import { categorias, contarItens } from './data/presentes';
import imgRamoTopo from './assets/07_Presentes__ramo_topo.png';

import imgPaisagem from './assets/07_Presentes__paisagem_rodape.png';
import imgRamoRodape from './assets/07_Presentes__ramo_rodape_direita.png';



export default function PaginaPresentes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EFE7DC] font-principal text-vinho">

      {/* TOPO */}
      <header className="relative flex items-center justify-center bg-[#EFE7DC] px-6 py-6">
        <Link
          to="/"
          className="absolute left-6 font-apoio text-[8px] tracking-[0.2em] text-vinho/70 transition hover:text-dourado md:text-[10px]"
        >
          ← INÍCIO
        </Link>
        <MonogramaIR className="h-8 w-11 md:h-10 md:w-14" />
      </header>

      {/* HERO */}
      <section className="bg-[#E9DFD3] px-6 pb-10 pt-8 text-center md:pb-16 md:pt-12">
        <img
          src={imgRamoTopo}
          alt=""
          aria-hidden="true"
          className="mx-auto mb-4 h-10 w-auto object-contain mix-blend-darken md:h-16"
        />
        <h1 className="text-3xl font-light tracking-[0.2em] text-vinho md:text-6xl">
          LISTA DE PRESENTES
        </h1>
        <p className="mx-auto mt-4 max-w-xs text-sm italic leading-relaxed text-vinho/80 md:max-w-xl md:text-2xl">
          Para a nossa nova casa e para as experiências que viveremos juntos.
        </p>
        <div className="mx-auto my-6 h-px w-16 bg-dourado/50 md:my-8 md:w-24" />
        <p className="mx-auto max-w-xs text-xs leading-relaxed text-vinho/80 md:max-w-md md:text-lg">
          Escolha o presente que desejar e faça parte desse novo capítulo da nossa história.
        </p>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              to={`/presentes/${cat.slug}`}
              className="group flex aspect-[3/4] flex-col items-center justify-between border border-dourado/30 bg-[#EFE7DC] px-2 pb-3 pt-4 text-center transition hover:border-dourado/60 hover:shadow-sm md:px-4 md:pb-6 md:pt-8"
            >
              <img
                src={cat.img}
                alt=""
                aria-hidden="true"
                className="h-[42%] w-full object-contain mix-blend-darken"
              />

              <div className="flex flex-col items-center">
                <h3 className="font-apoio text-[7px] leading-tight tracking-[0.12em] text-vinho md:text-lg md:tracking-[0.15em]">
                  {cat.nome}
                </h3>
                <div className="my-2 h-px w-6 bg-dourado/60 md:my-3 md:w-10" />
                <p className="font-apoio text-[6px] tracking-[0.12em] text-vinho/70 md:text-xs md:tracking-[0.15em]">
  {contarItens(cat.slug)} {cat.unidade}
</p>
              </div>

              <span className="text-sm text-dourado transition group-hover:translate-x-1 md:text-2xl" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="relative overflow-hidden px-6 pb-16 pt-12 text-center md:pb-24 md:pt-20">
        <img
          src={imgPaisagem}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-0 w-[38%] max-w-md mix-blend-darken"
        />
        <img
          src={imgRamoRodape}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 z-0 w-[45%] max-w-xs mix-blend-darken"
        />

        <div className="relative z-10 mx-auto max-w-xs md:max-w-md">
          <div className="mx-auto mb-5 h-px w-16 bg-dourado/50" />
          <p className="font-apoio text-[9px] tracking-[0.25em] text-vinho md:text-sm">
            UM PRESENTE PARA A NOSSA HISTÓRIA
          </p>
          <p className="mt-3 text-[11px] italic leading-relaxed text-vinho/80 md:text-base">
            Seja para a nossa casa, seja para a nossa lua de mel, cada presente fará parte de um
            momento especial da nossa vida juntos.
          </p>
          <p className="mt-6 text-[10px] text-vinho/70 md:text-sm">Com carinho,</p>
          <p className="mt-1 text-2xl italic text-dourado md:text-4xl">Isabella &amp; Rafael</p>
        </div>
      </footer>
    </div>
  );
}