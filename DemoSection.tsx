import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURAÇÃO DA PLAYLIST (ARQUIVOS .WAV) ---
// Certifique-se de que os arquivos na pasta 'public_html/musicas' tenham EXATAMENTE esses nomes
const STATIC_PLAYLIST = [
  {
    id: 'lei8080',
    name: 'Lei 8080 (O SUS é Nosso)',
    src: 'musicas/lei-8080.wav', 
    type: 'Pagode',
    size: 'Alta Qualidade (WAV)'
  },
  {
    id: 'analgesicos',
    name: 'Farmacologia: Analgésicos',
    src: 'musicas/analgesicos.wav',
    type: 'Sertanejo',
    size: 'Alta Qualidade (WAV)'
  },
  {
    id: 'bacterias',
    name: 'Microbiologia: Bactérias Hospitalares',
    src: 'musicas/bacterias.wav',
    type: 'Rock/Epic',
    size: 'Alta Qualidade (WAV)'
  },
  {
    id: 'abo',
    name: 'Imuno: Sistema ABO',
    src: 'musicas/sistema-abo.wav',
    type: 'Pop',
    size: 'Alta Qualidade (WAV)'
  },
  {
    id: 'coagulacao',
    name: 'Fisiologia: Cascata da Coagulação',
    src: 'musicas/coagulacao.wav',
    type: 'Acústico',
    size: 'Alta Qualidade (WAV)'
  }
];

const DemoSection: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  
  // Referência para controlar se já carregamos a música atual no player
  const loadedSongIdRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Inicializa o Objeto de Áudio
  useEffect(() => {
    audioRef.current = new Audio();
    // Volume inicial em 80% para não assustar
    audioRef.current.volume = 0.8; 
    
    // Limpeza ao sair da página (desmontar componente)
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
    };
  }, []);

  // 2. Gerencia a troca de Faixas e Carregamento
  useEffect(() => {
    if (!audioRef.current || STATIC_PLAYLIST.length === 0) return;

    // Garante índice válido
    let validIndex = currentTrackIndex;
    if (validIndex >= STATIC_PLAYLIST.length) validIndex = 0;

    const track = STATIC_PLAYLIST[validIndex];

    // Só carrega a fonte se a música mudou de fato
    if (track.id !== loadedSongIdRef.current) {
        audioRef.current.src = track.src; 
        audioRef.current.load();
        loadedSongIdRef.current = track.id;
        
        // Se estava tocando antes (ou se o usuário clicou next), tenta tocar
        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.warn("Autoplay bloqueado ou aguardando interação:", e);
                setIsPlaying(false);
            });
        }
    }
  }, [currentTrackIndex]); // Dependência apenas do índice para evitar loops

  // 3. Listeners de Eventos do Áudio (Progresso, Fim, Play/Pause)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const dur = audio.duration;
      
      if (dur && !isNaN(dur) && isFinite(dur)) {
        setProgress((current / dur) * 100);
        setCurrentTime(formatTime(current));
        setDuration(formatTime(dur));
      }
    };

    const handleEnded = () => {
        handleNext(); // Toca a próxima automaticamente
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Adiciona os ouvintes
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Remove os ouvintes ao desmontar
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []); 

  // Formatador de tempo (Segundos -> MM:SS)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  // Controles do Usuário
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Erro playback click:", e));
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % STATIC_PLAYLIST.length);
    setIsPlaying(true); 
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + STATIC_PLAYLIST.length) % STATIC_PLAYLIST.length);
    setIsPlaying(true);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const clickX = e.nativeEvent.offsetX;
    const width = e.currentTarget.clientWidth;
    const newTime = (clickX / width) * audioRef.current.duration;
    
    if (isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
    }
  };

  const currentSong = STATIC_PLAYLIST[currentTrackIndex];

  return (
    <section id="demo" className="py-20 pattern-bg relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            {/* Texto Descritivo */}
            <div className="md:w-1/2">
                <div className="inline-block bg-brand-light text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    Neurociência Aplicada
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-800 mb-6">
                    Aperte o Play e <span className="text-brand">absorva o conteúdo</span> sem esforço
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Músicas não são apenas entretenimento. Elas usam o hipocampo do cérebro para criar conexões neurais fortes. É por isso que você lembra letras de músicas de 10 anos atrás, mas esquece o artigo da lei que leu ontem.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-brand-accent">
                    <p className="text-sm italic text-gray-600">"Estou ouvindo no ônibus indo para o estágio. É bizarro como as informações simplesmente aparecem na minha cabeça quando leio as questões."</p>
                    <p className="text-xs font-bold text-gray-800 mt-2">- Depoimento de Aluno Verificado</p>
                </div>
            </div>

            {/* Player Visual */}
            <div className="md:w-1/2 w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 relative z-10 transform rotate-1 hover:rotate-0 transition duration-500 group">
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                        Amostra Grátis
                    </div>
                    
                    {/* Header do Player */}
                    <div className="flex items-center justify-between mb-6 border-b pb-4">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <span className={`w-2 h-2 bg-green-500 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span> 
                            {isPlaying ? 'Tocando agora' : 'Pausado'}
                        </h3>
                        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
                            {currentTrackIndex + 1} / {STATIC_PLAYLIST.length}
                        </span>
                    </div>
                    
                    {/* Info da Música e Capa */}
                    <div className="flex gap-4 mb-6">
                        <div className={`w-24 h-24 bg-gradient-to-br from-brand to-brand-light rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden transition-all duration-700 ${isPlaying ? 'scale-100' : 'scale-95 grayscale'}`}>
                            <div className="absolute inset-0 bg-black opacity-10"></div>
                            <i className={`ph-fill ph-music-note text-4xl relative z-10 ${isPlaying ? 'animate-bounce-slow' : ''}`}></i>
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                            <h4 className="font-bold text-lg text-gray-800 truncate" title={currentSong?.name}>
                                {currentSong?.name}
                            </h4>
                            <p className="text-sm text-gray-500">{currentSong?.type} • {currentSong?.size}</p>
                            
                            {/* Barra de Progresso */}
                            <div 
                                className="w-full bg-gray-200 rounded-full h-1.5 mt-3 cursor-pointer group/bar"
                                onClick={handleProgressBarClick}
                            >
                                <div 
                                    className="bg-brand h-1.5 rounded-full relative transition-all duration-100" 
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute right-0 -top-1 w-3 h-3 bg-brand-dark rounded-full shadow opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
                                <span>{currentTime}</span>
                                <span>{duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Botões de Controle */}
                    <div className="flex justify-center items-center gap-8 text-brand-dark">
                        <button onClick={handlePrev} className="hover:text-brand transition transform active:scale-95">
                            <i className="ph-fill ph-skip-back text-2xl"></i>
                        </button>
                        
                        <button 
                            onClick={togglePlay}
                            className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-brand/40 cursor-pointer hover:bg-brand-dark transition transform hover:scale-110 active:scale-95"
                        >
                            <i className={`ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'} text-3xl ml-1`}></i>
                        </button>
                        
                        <button onClick={handleNext} className="hover:text-brand transition transform active:scale-95">
                            <i className="ph-fill ph-skip-forward text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default DemoSection;