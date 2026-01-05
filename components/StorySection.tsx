import React from 'react';

const StorySection: React.FC = () => {
  return (
    <section className="py-20 bg-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-light opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Image Side */}
            <div className="md:w-2/5 relative h-96 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Estudante feliz" 
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent flex flex-col justify-end p-8 md:hidden">
                <p className="text-white font-bold text-lg drop-shadow-md">Mariana S.</p>
                <p className="text-brand-light text-sm font-semibold drop-shadow-md">Aprovada em 4º Lugar</p>
              </div>
            </div>

            {/* Text Side */}
            <div className="md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                História Real
              </div>
              
              <h2 className="font-display font-bold text-3xl text-gray-800 mb-6 leading-tight">
                "Eu estava prestes a <span className="text-red-500 underline decoration-red-200 decoration-4">desistir da Enfermagem</span>..."
              </h2>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  "Meu nome é Mariana, tenho 26 anos. Minha rotina era insana: plantão de 12h, casa, marido, e ainda tentar estudar. Eu comprava apostilas caras, PDFs de 500 páginas... mas a verdade? <strong>Eu dormia em cima dos livros.</strong>"
                </p>
                <p>
                  "Reprovei 3 vezes. Me sentia burra, incapaz. Até que um dia, rolando o feed no ônibus, vi o SaúdeSound. Pensei: <em>'Música? Isso deve ser golpe.'</em> Mas estava tão desesperada que testei."
                </p>
                <p>
                  "Troquei o Spotify pelas paródias no trajeto do trabalho. Em uma semana, eu estava cantando a Lei 8.080 no chuveiro. Na hora da prova da Prefeitura, <strong>foi assustador:</strong> eu lia a questão e a voz do cantor vinha na minha cabeça com a resposta."
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-lg">Mariana Silva</p>
                  <p className="text-green-600 font-semibold">Ex-reprovada, hoje Concursada</p>
                </div>
                <div className="hidden md:block">
                  <img src="https://img.icons8.com/color/96/checked-user-male--v1.png" alt="Verificado" className="w-12 h-12 opacity-80" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;