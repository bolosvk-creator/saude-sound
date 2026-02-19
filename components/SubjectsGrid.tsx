import React from 'react';

const subjects = [
  {
    name: "Legislação do SUS",
    icon: "ph-first-aid-kit",
    color: "text-green-600",
    bg: "bg-green-100",
    desc: "Leis 8.080, 8.142, Decretos 7.508 e História das Políticas de Saúde."
  },
  {
    name: "Farmacologia",
    icon: "ph-pill",
    color: "text-blue-600",
    bg: "bg-blue-100",
    desc: "Antibióticos, Anti-hipertensivos, AINEs e Psicofármacos."
  },
  {
    name: "Microbiologia",
    icon: "ph-virus",
    color: "text-purple-600",
    bg: "bg-purple-100",
    desc: "Bacteriologia, Virologia, Micologia e Doenças Infecciosas."
  },
  {
    name: "Epidemiologia",
    icon: "ph-chart-line-up",
    color: "text-red-600",
    bg: "bg-red-100",
    desc: "Indicadores de Saúde, Vigilância Epidemiológica e Estudos."
  },
  {
    name: "Saúde Pública",
    icon: "ph-users-three",
    color: "text-orange-600",
    bg: "bg-orange-100",
    desc: "PNAB, Estratégia Saúde da Família e Redes de Atenção."
  },
  {
    name: "Bioquímica",
    icon: "ph-flask",
    color: "text-teal-600",
    bg: "bg-teal-100",
    desc: "Metabolismo, Enzimas, Vitaminas e Ciclo de Krebs."
  },
  {
    name: "Imunologia",
    icon: "ph-shield-check",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    desc: "Vacinas, Sistema Imune Inato e Adquirido, Antígenos."
  },
  {
    name: "Fisiologia & Anatomia",
    icon: "ph-heartbeat",
    color: "text-pink-600",
    bg: "bg-pink-100",
    desc: "Sistemas Cardiovascular, Respiratório, Renal e Nervoso."
  }
];

const SubjectsGrid: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-brand-light/30 text-brand-dark px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Grade Curricular Completa
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Domine as matérias que <span className="text-brand">mais caem em prova</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Transformamos os conteúdos mais densos e difíceis em paródias fáceis de decorar. Sua playlist de estudos inclui:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-light transition duration-300 flex flex-col items-start group">
              <div className={`w-12 h-12 ${subject.bg} ${subject.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`ph-fill ${subject.icon}`}></i>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{subject.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{subject.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            <i className="ph-fill ph-plus-circle text-brand mr-1"></i>
            E muito mais temas adicionados semanalmente...
          </p>
          <a
            href="https://pay.hotmart.com/M103414494J?checkoutMode=10&bid=1768862904008"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-dark transition border-b-2 border-brand/20 hover:border-brand pb-1"
          >
            Ver lista de músicas completa
            <i className="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SubjectsGrid;