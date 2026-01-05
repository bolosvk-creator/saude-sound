import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl text-center text-gray-800 mb-2">Quem ouviu, passou.</h2>
            <p className="text-center text-gray-500 mb-12">Resultados reais de concurseiros reais.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex text-yellow-400 mb-4 text-sm gap-1">
                        <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
                    </div>
                    <p className="text-gray-700 italic mb-6">"Eu errava tudo de SUS. Comprei o pack numa sexta, ouvi o fim de semana todo. Domingo na prova da EBSERH: <strong>gabaritei as 10 questões</strong>. Surreal."</p>
                    <div className="flex items-center gap-3 border-t pt-4">
                        <div className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center font-bold">L</div>
                        <div>
                            <p className="font-bold text-sm text-gray-900">Larissa M.</p>
                            <p class="text-xs text-green-600 font-bold">Aprovada 2º Lugar</p>
                        </div>
                    </div>
                </div>
                 {/* Card 2 */}
                 <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex text-yellow-400 mb-4 text-sm gap-1">
                        <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
                    </div>
                    <p className="text-gray-700 italic mb-6">"Trabalho 12x36 e tenho filho pequeno. Meu único tempo de estudo era no carro. Esse pack <strong>salvou minha preparação</strong>. Vale cada centavo."</p>
                    <div className="flex items-center gap-3 border-t pt-4">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">R</div>
                        <div>
                            <p className="font-bold text-sm text-gray-900">Roberto S.</p>
                            <p class="text-xs text-green-600 font-bold">Téc. Enfermagem</p>
                        </div>
                    </div>
                </div>
                 {/* Card 3 */}
                 <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex text-yellow-400 mb-4 text-sm gap-1">
                        <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
                    </div>
                    <p className="text-gray-700 italic mb-6">"A música de Farmaco é chiclete puro! Cantava mentalmente durante a prova. Resultado: <strong>Nome no Diário Oficial!</strong>"</p>
                    <div className="flex items-center gap-3 border-t pt-4">
                        <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">A</div>
                        <div>
                            <p className="font-bold text-sm text-gray-900">Ana Paula C.</p>
                            <p class="text-xs text-green-600 font-bold">Concursada Pref. SP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Testimonials;