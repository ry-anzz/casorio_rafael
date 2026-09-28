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

    {/* NOSSA HISTÓRIA */}
<section
  id="historia"
  className="relative overflow-hidden bg-[#E9DFD3] py-16 md:py-24 lg:py-32"
>
  <div className="mx-auto w-full max-w-sm bg-[#E9DFD3] px-6 md:max-w-4xl md:px-12 lg:max-w-5xl lg:px-16">

    {/* Título */}
    <div className="relative z-20 mb-6 text-center md:mb-12">
      <div className="mb-3 font-apoio text-base tracking-[0.4em] text-dourado md:mb-5 md:text-xl">
        I R
      </div>

      <h2 className="font-apoio text-2xl tracking-widest text-dourado md:text-4xl lg:text-5xl">
        NOSSA HISTÓRIA
      </h2>
    </div>

    {/* Texto à esquerda + floral à direita */}
    <div className="flex items-stretch gap-2 md:gap-8 lg:gap-12">

      {/* Texto */}
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

      {/* Flor */}
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

    </div>
  );
}

export default App;