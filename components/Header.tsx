import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-40 transition-all duration-300 top-8" id="header">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <i className="ph-fill ph-music-notes text-brand text-3xl"></i>
                <div className="flex flex-col">
                    <span className="font-display font-bold text-xl text-gray-800 leading-none">Saúde<span className="text-brand">Sound</span></span>
                    <span className="text-[0.6rem] text-gray-500 font-bold tracking-widest uppercase">Memorização Acelerada</span>
                </div>
            </div>
            <a 
                href="https://pay.hotmart.com/M103414494J" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105 shadow-lg border-b-4 border-green-700"
            >
                <i className="ph-bold ph-lock-key-open"></i> Liberar Acesso VIP
            </a>
        </div>
    </header>
  );
};

export default Header;