import React from 'react';

const PlatformExplainer: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Muito mais que apenas áudio. <br />
            <span className="text-brand">Sua central de aprovação completa.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Acesso multiplataforma para você estudar onde, quando e como quiser. Otimize cada minuto do seu dia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300 hover:-translate-y-1 group">
            <div className="w-14 h-14 bg-brand-light/20 text-brand rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
              <i className="ph-fill ph-globe"></i>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Plataforma Online</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Acesse de qualquer lugar: Computador, Tablet ou Celular. Uma área de membros moderna, intuitiva e que não ocupa a memória do seu aparelho.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300 hover:-translate-y-1 group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <i className="ph-fill ph-file-pdf"></i>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">PDF com Letras</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Todas as músicas acompanham material em PDF com a letra completa e destaques dos artigos da lei, para você acompanhar cantando.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300 hover:-translate-y-1 group">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <i className="ph-fill ph-playlist"></i>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Novas Músicas Semanais</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              O pack é vivo! Toda semana adicionamos novas paródias baseadas nas atualizações legislativas e nos pedidos da comunidade.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300 hover:-translate-y-1 group">
            <div className="w-14 h-14 bg-orange-100 text-brand-accent rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-brand-accent group-hover:text-white transition-colors">
              <i className="ph-fill ph-brain"></i>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Memorização Visual</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Potencialize a fixação com materiais de apoio visuais e esquemas que conectam a letra da música aos pontos chaves da matéria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformExplainer;