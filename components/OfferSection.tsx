import React from 'react';

interface OfferSectionProps {
  timer: string;
}

const OfferSection: React.FC<OfferSectionProps> = ({ timer }) => {
  return (
    <section id="offer" className="py-20 bg-brand-dark relative overflow-hidden text-white">
        {/* Decoration */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border-4 border-white/10">
                
                {/* Value Stack (Left) */}
                <div className="p-8 lg:p-12 lg:w-3/5 text-gray-800 bg-gray-50">
                    <h3 className="text-3xl font-bold mb-2 text-brand-dark">PACOTE VITALÍCIO VIP</h3>
                    <p className="text-gray-500 mb-6">Tudo o que você precisa para memorizar e passar.</p>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="flex items-center gap-2"><i className="ph-fill ph-check-circle text-green-500"></i> +100 Músicas (SUS, Farmaco, Anatomia)</span>
                            <span className="text-gray-400 line-through text-sm">R$ 197</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="flex items-center gap-2"><i className="ph-fill ph-check-circle text-green-500"></i> Plataforma Online + PDFs</span>
                            <span className="text-gray-400 line-through text-sm">R$ 47</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2 bg-yellow-50 p-2 -mx-2 rounded">
                            <span className="flex items-center gap-2 font-bold text-brand-dark"><i className="ph-fill ph-star text-brand-accent"></i> BÔNUS: Atualizações Semanais</span>
                            <span className="text-brand-accent font-bold text-sm">IMENSURÁVEL</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="flex items-center gap-2 font-bold text-brand-dark"><i className="ph-fill ph-gift text-brand-accent"></i> BÔNUS: Portal de Pedidos</span>
                            <span className="text-green-600 font-bold text-sm">GRÁTIS</span>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-500">Valor total se comprado separado:</p>
                        <p className="text-xl line-through text-red-400 font-bold">R$ 297,00</p>
                    </div>
                </div>

                {/* Price & Action (Right) */}
                <div className="bg-white p-8 lg:p-12 lg:w-2/5 flex flex-col justify-center items-center border-l border-gray-200 relative overflow-hidden">
                    {/* Ribbon */}
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-8 py-1 transform rotate-45 translate-x-8 translate-y-4 shadow-md">
                        -84% OFF
                    </div>

                    <p className="text-gray-600 text-sm font-bold mb-2 uppercase tracking-wide">Hoje por apenas:</p>
                    
                    {/* Updated Price Display */}
                    <div className="text-5xl font-extrabold text-brand-dark tracking-tighter mb-1 text-center leading-tight">
                        6 x de R$ 8,82<span className="text-brand-accent text-3xl align-top">*</span>
                    </div>
                    <span className="text-lg text-gray-600 mb-6 font-bold">Ou R$ 47,00 à vista</span>
                    
                    {/* Timer in Button Area */}
                    <div className="w-full bg-red-50 border border-red-100 text-red-800 text-center py-2 rounded mb-4 text-xs font-bold flex justify-center items-center gap-2">
                        <i className="ph-fill ph-timer"></i> Oferta encerra em: <span>{timer}</span>
                    </div>

                    <a 
                      href="https://pay.hotmart.com/M103414494J" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-6 rounded-lg shadow-[0_4px_14px_0_rgba(72,187,120,0.39)] transition transform hover:scale-105 active:scale-95 flex flex-col items-center leading-tight group text-center no-underline"
                    >
                        <span className="text-lg">QUERO MEU ACESSO</span>
                        <span className="text-xs font-normal opacity-90 group-hover:underline">Começar a estudar agora</span>
                    </a>
                    
                    <div className="mt-6 flex flex-col items-center gap-3 w-full">
                        <div className="flex justify-center items-center gap-4 w-full px-2 opacity-70 hover:opacity-100 transition-opacity">
                            <img src="https://img.icons8.com/color/48/pix.png" className="h-8 w-auto" alt="Pix" title="Pagamento via PIX" />
                            <img src="https://img.icons8.com/color/48/mastercard.png" className="h-8 w-auto" alt="Mastercard" title="Mastercard" />
                            <img src="https://img.icons8.com/color/48/visa.png" className="h-8 w-auto" alt="Visa" title="Visa" />
                            <img src="https://img.icons8.com/color/48/barcode.png" className="h-8 w-auto" alt="Boleto" title="Boleto Bancário" />
                        </div>
                        <p className="text-[10px] text-gray-400 text-center max-w-xs mt-1">
                            <i className="ph-fill ph-lock-key"></i> Ambiente 100% seguro.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Guarantee Badge (Risk Reversal) */}
            <div className="max-w-2xl mx-auto mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 border border-white/20">
                <img src="https://img.icons8.com/fluency/96/guarantee.png" alt="Garantia" className="w-20 h-20 drop-shadow-lg" />
                <div className="text-center md:text-left">
                    <h4 className="font-bold text-xl text-white">Teste por 7 dias sem compromisso</h4>
                    <p className="text-sm text-gray-200 mt-1">
                        Não confia na gente? Confie nos seus ouvidos. Compre, acesse e ouça. Se as músicas não grudarem na sua cabeça, envie um único e-mail e devolvemos 100% do valor. <strong>O risco é todo nosso.</strong>
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default OfferSection;