import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="hero-bg min-h-screen flex items-center justify-center text-center px-4 pt-20 pb-12 relative">
            <div className="max-w-5xl mx-auto text-white z-10">
                {/* Social Proof Tag */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in-up hover:bg-white/20 transition cursor-default">
                    <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border-2 border-brand-dark" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
                        <img className="w-6 h-6 rounded-full border-2 border-brand-dark" src="https://i.pravatar.cc/100?img=5" alt="User 2" />
                        <img className="w-6 h-6 rounded-full border-2 border-brand-dark" src="https://i.pravatar.cc/100?img=9" alt="User 3" />
                    </div>
                    <span className="text-green-300">Junte-se a +3.200 aprovados</span>
                </div>

                <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight mb-6 drop-shadow-2xl">
                    Pare de estudar errado. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-brand-accent">Memorize o SUS brincando</span> e garanta sua vaga.
                </h1>
                <p className="text-lg md:text-xl mb-10 font-light text-gray-100 max-w-3xl mx-auto">
                    Não é milagre, é <strong>Neurociência</strong>. Transforme decretos chatos e anatomia complexa em músicas que grudam na mente como "chiclete", permitindo que você estude no piloto automático.
                </p>

                <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                    <a
                        href={import.meta.env.VITE_HOTMART_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto bg-brand-accent hover:bg-brand-accentHover text-white font-bold text-xl py-5 px-10 rounded-lg shadow-[0_10px_20px_rgba(237,137,54,0.4)] transition transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 border-b-4 border-orange-700 animate-pulse-slow"
                    >
                        <span>SIM, QUERO GABARITAR</span>
                        <i className="ph-bold ph-arrow-right"></i>
                    </a>
                    <p className="text-xs text-gray-300 mt-2 md:mt-0 md:absolute md:-bottom-8 md:text-center w-full opacity-80">
                        <i className="ph-fill ph-lock-key"></i> Compra segura • Acesso Imediato • 7 dias de garantia
                    </p>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff" opacity=".25"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#ffffff" opacity=".5"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;