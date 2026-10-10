import React, { useEffect, useRef, useState } from 'react';

const ARQUIVO = '/musica.mp3';
const VOLUME_PADRAO = 0.35;

const lerVolumeSalvo = () => {
  try {
    const v = parseFloat(localStorage.getItem('musica-volume'));
    return Number.isNaN(v) ? VOLUME_PADRAO : Math.min(1, Math.max(0, v));
  } catch {
    return VOLUME_PADRAO;
  }
};

export default function MusicaFundo() {
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const volumeRef = useRef(lerVolumeSalvo());

  const [volume, setVolume] = useState(volumeRef.current);
  const [aberto, setAberto] = useState(false);

  // Liga o áudio ao controle de volume (só depois de um toque do usuário)
  const preparar = () => {
    if (ctxRef.current) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx || !audioRef.current) return;

    const ctx = new Ctx();
    const origem = ctx.createMediaElementSource(audioRef.current);
    const ganho = ctx.createGain();
    ganho.gain.value = volumeRef.current;
    origem.connect(ganho);
    ganho.connect(ctx.destination);

    ctxRef.current = ctx;
    gainRef.current = ganho;
  };

  const iniciar = () => {
    const audio = audioRef.current;
    if (!audio) return;
    preparar();
    ctxRef.current?.resume?.();
    audio.play().catch(() => {});
  };

  // Começa no primeiro toque em qualquer lugar da página
  useEffect(() => {
    const eventos = ['click', 'touchend', 'keydown'];

    const aoInteragir = () => {
      iniciar();
      eventos.forEach((e) => window.removeEventListener(e, aoInteragir));
    };

    eventos.forEach((e) => window.addEventListener(e, aoInteragir));
    return () =>
      eventos.forEach((e) => window.removeEventListener(e, aoInteragir));
  }, []);

  // Se o navegador pausar (ex.: aba em segundo plano), volta a tocar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const retomar = () => {
      if (ctxRef.current && audio.paused) {
        ctxRef.current.resume?.();
        audio.play().catch(() => {});
      }
    };
    const aoVoltar = () => {
      if (document.visibilityState === 'visible') retomar();
    };

    audio.addEventListener('pause', retomar);
    document.addEventListener('visibilitychange', aoVoltar);
    return () => {
      audio.removeEventListener('pause', retomar);
      document.removeEventListener('visibilitychange', aoVoltar);
    };
  }, []);

  const mudarVolume = (e) => {
    const v = parseFloat(e.target.value);
    volumeRef.current = v;
    setVolume(v);
    if (gainRef.current) gainRef.current.gain.value = v;
    try {
      localStorage.setItem('musica-volume', String(v));
    } catch {}
  };

  const mudo = volume === 0;

  return (
    <>
      <audio ref={audioRef} src={ARQUIVO} loop preload="auto" />

      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAberto((a) => !a)}
          aria-label="Ajustar volume da música"
          title="Volume"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-dourado/50 bg-[#EFE7DC]/90 text-dourado shadow-md backdrop-blur-sm transition hover:bg-[#E8DCC8]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6 9H3v6h3l5 4V5Z" />
            {mudo ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="m16 9 5 6m0-6-5 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
            )}
          </svg>
        </button>

        {aberto && (
          <div className="flex h-11 items-center rounded-full border border-dourado/40 bg-[#EFE7DC]/90 px-4 shadow-md backdrop-blur-sm">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={mudarVolume}
              aria-label="Volume"
              className="h-1 w-28 cursor-pointer accent-[#A48255]"
            />
          </div>
        )}
      </div>
    </>
  );
}