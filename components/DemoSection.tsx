import React, { useState, useEffect, useRef } from 'react';
import { getFilesFromDB, StoredFile, DB_UPDATE_EVENT } from '../utils/storage';

const DemoSection: React.FC = () => {
  const [playlist, setPlaylist] = useState<StoredFile[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isLoading, setIsLoading] = useState(true);
  
  // Track the ID of the song currently loaded in the audio element
  const loadedSongIdRef = useRef<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadMusic = async () => {
    try {
      const files = await getFilesFromDB();
      setPlaylist(files);
      
      // If playlist was empty and now has files, make sure we are ready
      if (files.length > 0 && loadedSongIdRef.current === null) {
          setCurrentTrackIndex(0);
      }
    } catch (error) {
      console.error("Erro ao carregar playlist", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial Load & Event Listener
  useEffect(() => {
    loadMusic();
    
    // Initialize Audio
    audioRef.current = new Audio();
    
    window.addEventListener(DB_UPDATE_EVENT, loadMusic);
    
    return () => {
        window.removeEventListener(DB_UPDATE_EVENT, loadMusic);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
    };
  }, []);

  // Handle Playlist/Track Updates
  useEffect(() => {
    if (!audioRef.current) return;

    if (playlist.length === 0) {
        audioRef.current.pause();
        setIsPlaying(false);
        loadedSongIdRef.current = null;
        setProgress(0);
        return;
    }

    // Ensure index is valid
    let validIndex = currentTrackIndex;
    if (validIndex >= playlist.length) {
        validIndex = 0;
        setCurrentTrackIndex(0);
    }

    const file = playlist[validIndex];

    // Only update source if the song actually changed
    if (file.id !== loadedSongIdRef.current) {
        const fileUrl = URL.createObjectURL(file.blob);
        audioRef.current.src = fileUrl;
        audioRef.current.load();
        loadedSongIdRef.current = file.id;
        
        // Auto play if we were playing, or if this is a track change triggered by user (implies isPlaying=true)
        // Note: For initial load, isPlaying is false, so it won't autoplay.
        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.error("Erro playback auto:", e);
                setIsPlaying(false);
            });
        }
    }
  }, [currentTrackIndex, playlist, isPlaying]);

  // Handle Audio Events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const dur = audio.duration;
      
      if (dur) {
        setProgress((current / dur) * 100);
        setCurrentTime(formatTime(current));
        setDuration(formatTime(dur));
      }
    };

    const handleEnded = () => {
        handleNext();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []); // Bind once

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  const togglePlay = () => {
    if (!audioRef.current || playlist.length === 0) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Erro playback click:", e));
    }
    // State update handled by event listeners on audio object
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true); 
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const clickX = e.nativeEvent.offsetX;
    const width = e.currentTarget.clientWidth;
    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const currentSong = playlist.length > 0 ? playlist[Math.min(currentTrackIndex, playlist.length - 1)] : null;

  return (
    <section id="demo" className="py-20 pattern-bg relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
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
                    
                    {isLoading ? (
                         <div className="h-48 flex items-center justify-center text-brand">
                             <i className="ph-bold ph-spinner animate-spin text-3xl"></i>
                         </div>
                    ) : playlist.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between mb-6 border-b pb-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <span className={`w-2 h-2 bg-green-500 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span> 
                                    {isPlaying ? 'Tocando agora' : 'Pausado'}
                                </h3>
                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
                                    {Math.min(currentTrackIndex + 1, playlist.length)} / {playlist.length}
                                </span>
                            </div>
                            
                            <div className="flex gap-4 mb-6">
                                <div className={`w-24 h-24 bg-gradient-to-br from-brand to-brand-light rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden transition-all duration-700 ${isPlaying ? 'scale-100' : 'scale-95 grayscale'}`}>
                                    <div className="absolute inset-0 bg-black opacity-10"></div>
                                    <i className={`ph-fill ph-music-note text-4xl relative z-10 ${isPlaying ? 'animate-bounce-slow' : ''}`}></i>
                                </div>
                                <div className="flex-1 flex flex-col justify-center min-w-0">
                                    <h4 className="font-bold text-lg text-gray-800 truncate" title={currentSong?.name}>
                                        {currentSong?.name || "Carregando..."}
                                    </h4>
                                    <p className="text-sm text-gray-500">{currentSong?.type} • {currentSong?.size}</p>
                                    
                                    {/* Progress Bar */}
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
                        </>
                    ) : (
                        <div className="py-10 text-center flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                            <i className="ph-duotone ph-playlist text-4xl mb-2"></i>
                            <p className="font-bold text-gray-600">Nenhuma música disponível</p>
                            <p className="text-xs max-w-[200px] mb-4">Adicione arquivos através do painel administrativo.</p>
                            <div className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">
                                Dica: Clique no rodapé para acessar o admin
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
  );
};

export default DemoSection;