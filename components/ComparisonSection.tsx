import React from 'react';

const ComparisonSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-800">
                    Por que a maioria <span className="text-red-600">reprova</span> e nossos alunos <span className="text-green-600">passam</span>?
                </h2>
                <p className="text-gray-600 mt-4">A diferença não é inteligência, é <strong>método</strong>.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
                {/* The Old Way */}
                <div className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-200 w-full md:w-1/2 opacity-75 hover:opacity-100 transition">
                    <h3 className="font-bold text-xl text-gray-500 mb-6 flex items-center gap-2">
                        <i className="ph-bold ph-x-circle text-red-500 text-2xl"></i> Método Tradicional
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <i className="ph-bold ph-x text-red-400 mt-1"></i>
                            <span className="text-gray-600">Leitura passiva e cansativa de PDFs intermináveis.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ph-bold ph-x text-red-400 mt-1"></i>
                            <span className="text-gray-600">Esquece 80% do conteúdo após 24 horas (Curva do Esquecimento).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ph-bold ph-x text-red-400 mt-1"></i>
                            <span className="text-gray-600">Estuda cansado após o plantão e dorme em cima dos livros.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ph-bold ph-x text-red-400 mt-1"></i>
                            <span className="text-gray-600">Ansiedade e "branco" na hora da prova.</span>
                        </li>
                    </ul>
                </div>

                {/* VS Icon */}
                <div className="bg-brand-accent text-white font-black rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg z-10 -my-4 md:-mx-4 md:my-0">
                    VS
                </div>

                {/* The New Way (Highlighted) */}
                <div className="bg-white p-8 rounded-2xl border-2 border-green-400 w-full md:w-1/2 shadow-2xl relative transform scale-105">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        Recomendado
                    </div>
                    <h3 className="font-bold text-xl text-brand-dark mb-6 flex items-center gap-2">
                        <i className="ph-bold ph-check-circle text-green-500 text-2xl"></i> Método SaúdeSound
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <i className="ph-bold ph-check text-green-500 mt-1"></i>
                            <span className="text-gray-700 font-medium">Aprendizado passivo: aprenda ouvindo enquanto faz outras coisas.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ph-bold ph-check text-green-500 mt-1"></i>
                            <span className="text-gray-700 font-medium">Retenção de longo prazo através de rimas e melodias (Mnemônica Musical).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ph-bold ph-check text-green-500 mt-1"></i>
                            <span className="text-gray-700 font-medium">Estudo leve e divertido, mesmo estando exausto.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ph-bold ph-check text-green-500 mt-1"></i>
                            <span className="text-gray-700 font-medium">Memória auditiva ativada automaticamente na prova.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ComparisonSection;