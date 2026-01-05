import React, { useState } from 'react';

interface FooterProps {
  onSecretTrigger?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSecretTrigger }) => {
  const [clickCount, setClickCount] = useState(0);
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  const handleSecretClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 5) {
      if (onSecretTrigger) onSecretTrigger();
      setClickCount(0);
    }

    // Reset count if user stops clicking for 2 seconds
    setTimeout(() => {
        setClickCount(0);
    }, 2000);
  };

  const openModal = (e: React.MouseEvent, type: 'terms' | 'privacy') => {
      e.preventDefault();
      setActiveModal(type);
  };

  const closeModal = () => {
      setActiveModal(null);
  };

  return (
    <>
        <footer className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800 relative z-30">
            <div className="container mx-auto px-4 text-center">
                <div 
                    className="flex flex-col items-center justify-center gap-2 mb-6 cursor-pointer select-none transition active:scale-95"
                    onClick={handleSecretClick}
                    title="SaúdeSound"
                >
                    <i className={`ph-fill ph-music-notes text-3xl ${clickCount > 0 ? 'text-brand-accent animate-pulse' : 'text-brand'}`}></i>
                    <span className="font-display font-bold text-xl text-white">Saúde<span className="text-brand">Sound</span></span>
                </div>
                <p className="text-sm mb-4">Contato: suporte@saudesound.com.br</p>
                <div className="flex justify-center gap-6 text-xs font-semibold uppercase tracking-wider">
                    <button onClick={(e) => openModal(e, 'terms')} className="hover:text-white transition focus:outline-none">Termos de Uso</button>
                    <button onClick={(e) => openModal(e, 'privacy')} className="hover:text-white transition focus:outline-none">Privacidade</button>
                </div>
                <p className="text-[10px] mt-8 text-gray-600">Este site não é afiliado ao Facebook ou a qualquer entidade governamental.</p>
            </div>
        </footer>

        {/* Modal Overlay */}
        {activeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>
                <div className="bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-lg relative z-10 animate-fade-in-up flex flex-col max-h-[80vh]">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
                        <h3 className="font-bold text-xl text-brand-dark">
                            {activeModal === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
                        </h3>
                        <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition">
                            <i className="ph-bold ph-x text-xl"></i>
                        </button>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 overflow-y-auto text-sm leading-relaxed text-gray-600 custom-scrollbar">
                        {activeModal === 'terms' ? (
                            <div className="space-y-4">
                                <p><strong>1. Licença de Uso:</strong> Ao adquirir o pacote SaúdeSound, você recebe uma licença de uso pessoal, intransferível e revogável. É estritamente proibido compartilhar seu login, vender ou distribuir os arquivos de áudio e PDF para terceiros.</p>
                                <p><strong>2. Propriedade Intelectual:</strong> Todo o conteúdo (letras, melodias, arranjos e materiais gráficos) é protegido por leis de direitos autorais. A pirataria é crime e monitoramos compartilhamentos ilegais.</p>
                                <p><strong>3. Acesso Vitalício:</strong> A oferta atual garante acesso enquanto a plataforma existir. Nos reservamos o direito de migrar a plataforma de hospedagem mediante aviso prévio, garantindo que você não perca seus arquivos.</p>
                                <p><strong>4. Garantia:</strong> O prazo de garantia incondicional é de 7 dias corridos após a confirmação do pagamento, conforme o Código de Defesa do Consumidor para produtos digitais.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p><strong>1. Coleta de Dados:</strong> Coletamos apenas os dados essenciais para a prestação do serviço: Nome, E-mail e CPF (para emissão de Nota Fiscal). Não vendemos seus dados para terceiros.</p>
                                <p><strong>2. Segurança do Pagamento:</strong> Todas as transações são processadas externamente pela Hotmart/Gateway de Pagamento, que possui certificação PCI DSS. Nós não temos acesso aos números do seu cartão de crédito.</p>
                                <p><strong>3. Cookies:</strong> Utilizamos cookies para melhorar a experiência de navegação e para fins de marketing (Remarketing), permitindo que possamos mostrar anúncios relevantes para você.</p>
                                <p><strong>4. Comunicação:</strong> Ao se cadastrar, você concorda em receber e-mails sobre atualizações do produto e novas ofertas. Você pode se descadastrar a qualquer momento clicando no link no rodapé dos e-mails.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl text-center">
                        <button 
                            onClick={closeModal}
                            className="bg-brand hover:bg-brand-dark text-white font-bold py-2 px-8 rounded-lg transition"
                        >
                            Entendi
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default Footer;