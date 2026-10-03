import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MonogramaIR from './components/MonogramaIR';

export default function PaginaObrigado() {
  const [params] = useSearchParams();
  const status = params.get('status') || params.get('collection_status');

  const pendente = status === 'pending' || status === 'in_process';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#EFE7DC] px-6 text-center font-principal text-vinho">
      <MonogramaIR className="mb-8 h-10 w-14" />
      <h1 className="text-3xl font-light tracking-[0.2em] text-dourado md:text-5xl">
        {pendente ? 'QUASE LÁ' : 'MUITO OBRIGADO'}
      </h1>
      <div className="my-6 h-px w-16 bg-dourado/50" />
      <p className="max-w-sm text-base italic leading-relaxed text-vinho/80 md:text-xl">
        {pendente
          ? 'Assim que o pagamento for confirmado, o seu presente será registrado. Obrigado pelo carinho!'
          : 'Seu presente foi recebido com muito carinho. Obrigado por fazer parte da nossa história!'}
      </p>
      <p className="mt-6 font-apoio text-[11px] tracking-[0.3em] text-dourado">
        ISABELLA &amp; RAFAEL
      </p>
      <Link
        to="/presentes"
        className="mt-10 border border-dourado/70 px-6 py-3 font-apoio text-[9px] tracking-[0.2em] text-dourado transition hover:bg-dourado/10"
      >
        VOLTAR PARA A LISTA
      </Link>
    </div>
  );
}