import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-40 transition-all duration-300 top-8" id="header">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* LOGO E TÍTULO */}
                <div className="flex items-center gap-4">

                    {/* TAMANHO AUMENTADO: De w-14/w-16 para w-20/w-24 */}
                    <img
                        src="/faviconuy.png?v=2000"
                        alt="Logo SaúdeSound"
                        className="w-20 h-20 md:w-24 md:h-24 object-contain mix-blend-multiply hover:scale-110 transition-transform cursor-pointer"
                    />

                    <div className="flex flex-col">
                        <span className="font-display font-bold text-2xl md:text-3xl text-gray-800 leading-none">
                            Saúde<span className="text-brand">Sound</span>
                        </span>
                        <span className="text-[0.7rem] md:text-sm text-gray-500 font-bold tracking-widest uppercase mt-1">
                            Memorização Acelerada
                        </span>
                    </div>
                </div>

                {/* BOTÃO VIP */}
                <a
                    href="https://pay.hotmart.com/M103414494J?checkoutMode=10&bid=1768862904008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg border-b-4 border-green-700"
                >
                    <i className="ph-bold ph-lock-key-open"></i> Liberar Acesso VIP
                </a>
            </div>
        </header>
    );
};

export default Header;