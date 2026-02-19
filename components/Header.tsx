import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-40 transition-all duration-300 top-8" id="header">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* LOGO E TÍTULO */}
                <div className="flex items-center gap-4">

                    {/* AQUI ESTÁ A MUDANÇA: Imagem com mix-blend-multiply para remover o fundo branco visualmente */}
                    <img
                        src="/faviconuy.png?v=400"
                        alt="Logo SaúdeSound"
                        className="w-14 h-14 md:w-16 md:h-16 object-contain mix-blend-multiply hover:scale-105 transition-transform"
                    />

                    <div className="flex flex-col">
                        <span className="font-display font-bold text-xl md:text-2xl text-gray-800 leading-none">
                            Saúde<span className="text-brand">Sound</span>
                        </span>
                        <span className="text-[0.6rem] md:text-xs text-gray-500 font-bold tracking-widest uppercase mt-1">
                            Memorização Acelerada
                        </span>
                    </div>
                </div>

                {/* BOTÃO VIP */}
                <a
                    href="https://pay.hotmart.com/M103414494J?checkoutMode=10&bid=1768862904008
"
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

