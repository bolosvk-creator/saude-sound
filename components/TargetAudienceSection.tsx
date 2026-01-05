import React from 'react';

const TargetAudienceSection: React.FC = () => {
  const areas = [
    "Enfermagem", "Medicina", "Farmácia", "Odontologia",
    "Nutrição", "Fisioterapia", "Psicologia", "Serviço Social",
    "Biomedicina", "Téc. Enfermagem", "Agente de Saúde"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Público Alvo
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-800 mb-6">
            Não importa sua fase, <br/>
            <span className="text-brand">a aprovação é para todos.</span>
          </h2>
          <p className="text-lg text-gray-500">
            O método de memorização por áudio foi desenhado para destravar o aprendizado em qualquer nível da carreira de saúde.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Card 1: Concurseiros */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-b-4 border-brand hover:-translate-y-2 transition duration-300 group">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center text-brand text-3xl mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                    <i className="ph-fill ph-bank"></i>
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Concurseiros</h3>
                <p className="text-gray-600 leading-relaxed">
                    Para você que precisa <strong>gabaritar Legislação do SUS</strong> e específicas para garantir a estabilidade no serviço público (EBSERH, Prefeituras, Tribunais).
                </p>
            </div>

            {/* Card 2: Acadêmicos */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-b-4 border-blue-500 hover:-translate-y-2 transition duration-300 group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <i className="ph-fill ph-student"></i>
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Acadêmicos & Residentes</h3>
                <p className="text-gray-600 leading-relaxed">
                    Afogado em livros? Otimize seu tempo de estudo para provas da faculdade e prepare-se desde cedo para as <strong>Residências Multiprofissionais</strong>.
                </p>
            </div>

            {/* Card 3: Profissionais */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-b-4 border-purple-500 hover:-translate-y-2 transition duration-300 group">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-3xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <i className="ph-fill ph-briefcase-metal"></i>
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Profissionais Atuantes</h3>
                <p className="text-gray-600 leading-relaxed">
                    Mantenha-se atualizado sobre as novas portarias e protocolos do Ministério da Saúde sem precisar parar sua rotina de plantões.
                </p>
            </div>
        </div>

        {/* Areas List */}
        <div className="text-center">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                Desenvolvido para profissionais de:
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {areas.map((area, idx) => (
                    <span key={idx} className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-full font-semibold shadow-sm hover:border-brand hover:text-brand transition cursor-default">
                        {area}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;