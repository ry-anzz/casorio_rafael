import React, { useState } from 'react';
import ilustracaoCapa from './assets/01_Capa__floral_principal.png';
import ilustracaoHistoria from './assets/02_Nossa_Historia__floral_direita.png';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E9DFD3] text-vinho font-principal overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-8 w-full relative">
        <div className="w-10"></div>
        <div className="text-3xl tracking-widest text-dourado font-apoio text-center z-10">
          I | R
        </div>
        <div className="w-10 flex justify-end z-10">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="flex flex-col space-y-1.5 cursor-pointer p-2 group"
          >
            <span className="w-6 h-[1px] bg-vinho group-hover:bg-dourado transition-colors"></span>
            <span className="w-6 h-[1px] bg-vinho group-hover:bg-dourado transition-colors"></span>
            <span className="w-6 h-[1px] bg-vinho group-hover:bg-dourado transition-colors"></span>
          </button>
        </div>
      </nav>

      <div className="w-full h-[1px] bg-dourado/20"></div>

      {/* SIDEBAR E OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-vinho/10 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      <div className={`fixed top-0 right-0 h-full w-72 bg-[#E3D8C8] shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col pt-12 px-8 border-l border-dourado/20`}>
        <button 
          onClick={() => setIsSidebarOpen(false)} 
          className="absolute top-8 right-8 text-vinho text-2xl hover:text-dourado transition-colors"
        >
          &#10005;
        </button>
        
        <div className="text-2xl tracking-widest text-dourado font-apoio text-center mb-12 mt-4">
          I | R
        </div>
        
        <div className="flex flex-col space-y-8 text-center text-sm tracking-[0.2em] font-apoio text-vinho/80">
          <a href="#inicio" onClick={() => setIsSidebarOpen(false)} className="hover:text-dourado transition">INÍCIO</a>
          <a href="#historia" onClick={() => setIsSidebarOpen(false)} className="hover:text-dourado transition">NOSSA HISTÓRIA</a>
          <a href="#rsvp" onClick={() => setIsSidebarOpen(false)} className="hover:text-dourado transition">RSVP</a>
          <a href="#presentes" onClick={() => setIsSidebarOpen(false)} className="hover:text-dourado transition">LISTA DE PRESENTES</a>
          <a href="#mensagens" onClick={() => setIsSidebarOpen(false)} className="hover:text-dourado transition">MENSAGENS</a>
        </div>
      </div>

      {/* CAPA DO SITE */}
      <section id="inicio" className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-light tracking-widest mb-4 mt-8">
          ISABELLA
          <br className="md:hidden" />
          <span className="text-3xl md:text-5xl italic text-dourado mx-4">&</span>
          <br className="md:hidden" />
          RAFAEL
        </h1>
        
        <div className="w-16 h-px bg-dourado my-8"></div>
        
        <p className="tracking-[0.25em] text-xs md:text-base text-vinho/80 mb-3 font-apoio">
          17 DE JANEIRO DE 2027
        </p>
        <p className="tracking-[0.25em] text-xs md:text-base text-vinho/80 font-apoio">
          SERRA DOS CRISTAIS
        </p>

        <div className="mt-12 flex items-center justify-center w-full">
          <img 
            src={ilustracaoCapa} 
            alt="Ilustração Floral" 
            className="w-72 md:w-96 object-contain translate-x-[-52px]" 
          />
        </div>
      </section>

      {/* NOSSA HISTÓRIA - CONTIDO NO TAMANHO DA FLOR */}
      {/* NOSSA HISTÓRIA */}
<section id="historia" className="py-16 relative overflow-hidden">

  <div className="w-full max-w-sm mx-auto px-6">

    {/* Título alinhado à esquerda */}
    <div className="text-center mb-6 relative z-20">
      <div className="text-base tracking-[0.4em] text-dourado font-apoio mb-3">I R</div>
      <h2 className="text-2xl tracking-widest text-dourado font-apoio">NOSSA HISTÓRIA</h2>
    </div>

   {/* Duas colunas: texto compacto à esquerda, flor ocupando todo o lado direito */}
<div className="flex items-stretch gap-2">

  {/* Coluna do texto - ainda mais compacta */}
  <div className="w-[55%] space-y-1.5 text-[8.5px] leading-snug text-vinho text-left">
    <p>A nossa história começou em 2018, quando nos conhecemos através de amigos em comum da faculdade.</p>
    <p>Desde o início, havia interesse e uma conexão entre nós. Mas, naquele momento, não existia ainda o compromisso ou o envolvimento necessário para construirmos uma vida juntos. Seguimos nossos caminhos, mantendo entre nós uma história que, de alguma forma, nunca deixou de existir.</p>
    <p>Em 2022, a vida nos aproximou novamente. Diante de um período delicado e de muitas mudanças, percebemos que já não queríamos viver a nossa relação da mesma maneira. Escolhemos nos aproximar de verdade, com intenção, compromisso e disposição para construir uma vida juntos.</p>
    <p>Foi preciso mudar muitas coisas. Passamos a dividir mais do que os momentos bons: dividimos decisões, responsabilidades, planos, medos e sonhos. Aos poucos, fomos entendendo que estar juntos significava escolher um ao outro também nos dias difíceis.</p>
    <p>A perda que vivemos naquele período transformou profundamente a nossa maneira de enxergar a vida e o nosso relacionamento. Diante dela, encontramos um no outro companhia, cuidado e força para seguir. E foi nesse caminho, construído com presença e entrega, que o nosso amor se tornou cada vez mais sólido.</p>
    <p>Hoje, olhando para trás, reconhecemos que a bondade e o amor do Senhor estiveram presentes em cada etapa da nossa história. Nos encontros, nos reencontros, nas mudanças e também nos momentos que não escolhemos viver, Deus nos sustentou e conduziu os nossos passos.</p>
  </div>

  {/* Coluna da flor - ocupa todo o lado direito, altura total da coluna de texto */}
  <div className="w-[45%] relative">
    <img
      src={ilustracaoHistoria}
      alt="Detalhe Floral"
      className="absolute inset-0 w-full h-full object-cover object-top"
    />
  </div>

</div>

  </div>

  {/* Final */}
<div className="mt-4 px-6 max-w-sm mx-auto flex flex-col items-center relative z-20 text-center">
  <div className="flex flex-col items-center justify-center w-full mb-6">
    <div className="w-16 h-[1px] bg-dourado/40 mb-4"></div>
    <p className="text-sm italic text-dourado px-2 leading-relaxed">
      O que começou com uma conexão em 2018 ganhou, em 2022, a decisão de caminharmos juntos.
    </p>
    <div className="w-16 h-[1px] bg-dourado/40 mt-4"></div>
  </div>
  <p className="text-[11px] text-vinho/80 italic px-2">
    E é essa história — construída com amor, fé, companheirismo e a escolha diária de um pelo outro — que agora celebramos ao lado das pessoas que amamos.
  </p>
  <div className="mt-8 text-xs tracking-[0.2em] text-dourado font-apoio flex flex-col items-center">
    <p className="mb-2">17.01.2027</p>
    <p>SERRA DOS CRISTAIS</p>
    <div className="mt-6 text-2xl">🌿</div>
  </div>
</div>
</section>

    </div>
  );
}

export default App;