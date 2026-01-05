import React from 'react';

const RequestSection: React.FC = () => {
  return (
    <section className="py-20 bg-brand text-white relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="md:w-1/2">
                <div className="inline-block bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                    <i className="ph-bold ph-star"></i> Exclusividade VIP
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                    Não encontrou o tema?<br/>
                    <span className="text-brand-accent">Você pede, a gente grava!</span>
                </h2>
                <p className="text-blue-50 text-lg mb-6">
                    Nosso pack é vivo. Ao entrar hoje, você ganha acesso vitalício ao nosso <strong>Portal de Sugestões</strong>. Seu edital tem um tema específico? Peça e nossa equipe musical produz.
                </p>
                
                {/* List */}
                <div className="space-y-4 bg-white/10 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-400 p-1.5 rounded-full"><i className="ph-bold ph-check text-brand-dark"></i></div>
                        <span className="font-semibold">Votação mensal de novos temas</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-green-400 p-1.5 rounded-full"><i className="ph-bold ph-check text-brand-dark"></i></div>
                        <span class="font-semibold">Sem custo adicional por atualizações</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-green-400 p-1.5 rounded-full"><i className="ph-bold ph-check text-brand-dark"></i></div>
                        <span class="font-semibold">Acesso direto aos produtores</span>
                    </div>
                </div>
            </div>
            
            {/* Visual Representation of Requests */}
            <div className="md:w-1/2 relative">
                 <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-pink-600 rounded-2xl blur opacity-30"></div>
                 <div className="bg-white text-gray-800 rounded-2xl p-6 relative shadow-xl">
                    <h4 className="font-bold text-gray-500 text-xs uppercase mb-4">Últimos pedidos atendidos:</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
                            <span className="font-bold text-sm">Lei 8080</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">ENTREGUE</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
                            <span className="font-bold text-sm">Farmacologia: Antibióticos</span>
                            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">ENTREGUE</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-yellow-500">
                            <span className="font-bold text-sm">Política Nacional de Humanização</span>
                            <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">PRODUZINDO</span>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </section>
  );
};

export default RequestSection;