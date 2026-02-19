import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, MusicNote, Spinner } from '@phosphor-icons/react';

// --- LISTA DE MÚSICAS ESTÁTICA (INFALÍVEL) ---
const STATIC_PLAYLIST = [
    {
        id: 'lei8080',
        name: 'Lei 8080 (O SUS é Nosso)',
        src: '/musicas/lei-8080.wav',
        type: 'Pagode',
        size: 'Alta Qualidade'
    },
    {
        id: 'analgesicos',
        name: 'Farmacologia: Analgésicos',
        src: '/musicas/analgesicos.wav',
        type: 'Sertanejo',
        size: 'Alta Qualidade'
    },
    {
        id: 'bacterias',
        name: 'Microbiologia: Bactérias',
        src: '/musicas/bacterias.wav',
        type: 'Rock/Epic',
        size: 'Alta Qualidade'
    },
    {
        id: 'abo',
        name: 'Imuno: Sistema ABO',
        src: '/musicas/sistema-abo.wav',
        type: 'Pop',
        size: 'Alta Qualidade'
    },
    {
        id: 'coagulacao',
        name: 'Fisiologia: Coagulação',
        src: '/musicas/coagulacao.wav',
        type: 'Acústico',
        size: 'Alta Qualidade'
    }
];

export default function DemoSection() {
    // Estados do Player
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Música atual baseada no índice
    const currentSong = STATIC_PLAYLIST[currentTrackIndex];

    // Função para formatar tempo (ex: 125s -> 2:05)
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' + s : s}`;
    };

    // Efeito para carregar a música quando o índice muda
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = currentSong.src;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.error("Erro autoplay:", e);
                    setIsPlaying(false);
                });
            }
        }
    }, [currentTrackIndex]);

    // Atualizar barra de progresso enquanto toca
    const onTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const dur = audioRef.current.duration;
            if (dur) {
                setProgress((current / dur) * 100);
                setCurrentTime(formatTime(current));
                setDuration(formatTime(dur));
            }
        }
    };

    // Quando a música acaba, vai para a próxima
    const onEnded = () => {
        handleNext();
    };

    // Controles
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
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
        audioRef.current.currentTime = newTime;
    };

    return (
        <section id="demo" className="py-20 pattern-bg relative overflow-hidden bg-gray-50">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">

                {/* LADO ESQUERDO: TEXTO DE VENDAS (MANTIDO IGUAL) */}
                <div className="md:w-1/2 text-left">
                    <div className="inline-block bg-brand-light/20 text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
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

                {/* LADO DIREITO: PLAYER VISUAL (CARD ÚNICO) */}
                <div className="md:w-1/2 w-full">
                    <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 relative z-10 transform rotate-1 hover:rotate-0 transition duration-500 group">
                        <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                            Amostra Grátis
                        </div>

                        {/* Elemento de Áudio Invisível */}
                        <audio
                            ref={audioRef}
                            onTimeUpdate={onTimeUpdate}
                            onEnded={onEnded}
                            onLoadedMetadata={onTimeUpdate}
                        />

                        {/* Cabeçalho do Player */}
                        <div className="flex items-center justify-between mb-6 border-b pb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <span className={`w-2 h-2 bg-green-500 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span>
                                {isPlaying ? 'Tocando agora' : 'Pausado'}
                            </h3>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
                                {currentTrackIndex + 1} / {STATIC_PLAYLIST.length}
                            </span>
                        </div>

                        {/* Corpo do Player */}
                        <div className="flex gap-4 mb-6">
                            {/* Capa do Álbum com Ícone */}
                            <div className={`w-24 h-24 bg-gradient-to-br from-brand to-brand-light rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden transition-all duration-700 ${isPlaying ? 'scale-100' : 'scale-95 grayscale'}`}>
                                <div className="absolute inset-0 bg-black opacity-10"></div>
                                <MusicNote weight="fill" className={`text-4xl relative z-10 ${isPlaying ? 'animate-bounce-slow' : ''}`} />
                            </div>

                            {/* Informações e Barra de Progresso */}
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                <h4 className="font-bold text-lg text-gray-800 truncate" title={currentSong.name}>
                                    {currentSong.name}
                                </h4>
                                <p className="text-sm text-gray-500">{currentSong.type} • {currentSong.size}</p>

                                {/* Barra de Progresso Clicável */}
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
                                <SkipBack weight="fill" className="text-2xl" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-brand/40 cursor-pointer hover:bg-brand-dark transition transform hover:scale-110 active:scale-95"
                            >
                                {isPlaying ? (
                                    <Pause weight="fill" className="text-3xl" />
                                ) : (
                                    <Play weight="fill" className="text-3xl ml-1" />
                                )}
                            </button>

                            <button onClick={handleNext} className="hover:text-brand transition transform active:scale-95">
                                <SkipForward weight="fill" className="text-2xl" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};