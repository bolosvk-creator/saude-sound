import React from 'react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
    <details className="group bg-white border border-gray-200 p-5 rounded-xl cursor-pointer hover:shadow-md transition duration-300">
        <summary className="flex justify-between items-center font-bold text-gray-700 list-none text-lg">
            {question}
            <span className="transition transform group-open:rotate-180 text-brand">
                <i className="ph-bold ph-caret-down"></i>
            </span>
        </summary>
        <div className="text-gray-600 mt-4 text-sm leading-relaxed border-t border-gray-100 pt-4">
            <p>{answer}</p>
        </div>
    </details>
);

const FAQ: React.FC = () => {
  return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display font-bold text-3xl text-center text-gray-800 mb-2">Perguntas Frequentes</h2>
            <p className="text-center text-gray-500 mb-10">Tiramos todas as suas dúvidas para você comprar com segurança.</p>
            
            <div className="space-y-4">
                <FAQItem 
                    question="Funciona para quem tem pouco tempo?" 
                    answer="Absolutamente. O método foi criado especificamente para quem tem uma rotina corrida (trabalho + estudo). A ideia não é adicionar mais horas de estudo sentado, mas sim transformar seu tempo 'morto' (trânsito, academia, tarefas domésticas, filas) em tempo produtivo de memorização passiva." 
                />
                <FAQItem 
                    question="Comecei a estudar agora, serve para mim?" 
                    answer="Com certeza! As músicas cobrem desde os conceitos básicos (como os princípios do SUS na Lei 8.080) até temas avançados. Para o iniciante, é a forma mais leve de ter o primeiro contato com a matéria sem se assustar com a linguagem jurídica difícil das leis." 
                />
                <FAQItem 
                    question="Como funciona o Portal de Pedidos?" 
                    answer="É uma exclusividade nossa. Dentro da área de membros, existe um canal direto onde você pode sugerir temas que sente dificuldade. Nossa equipe pedagógica analisa os pedidos e, mensalmente, produzimos novas paródias baseadas nas solicitações mais votadas pelos alunos. Você não paga nada a mais por essas atualizações." 
                />
                <FAQItem 
                    question="O acesso tem validade? Vou perder o material?" 
                    answer="Não! Nesta oferta de lançamento, o acesso é VITALÍCIO. Você paga uma única vez e o material é seu para sempre, incluindo todas as novas músicas que adicionarmos no futuro. Sem mensalidades ou renovações." 
                />
                <FAQItem 
                    question="Quais as formas de pagamento?" 
                    answer="Você pode pagar via Cartão de Crédito em até 6x, via PIX (aprovação imediata) ou Boleto Bancário. A plataforma de pagamento é 100% segura e criptografada." 
                />
                <FAQItem 
                    question="E se eu não gostar das músicas?" 
                    answer="Nós assumimos o risco. Você tem 7 dias de garantia incondicional. Compre, acesse a plataforma, ouça as músicas. Se por qualquer motivo você achar que não é para você, basta enviar um e-mail e devolvemos cada centavo do seu dinheiro. Sem letras miúdas." 
                />
                <FAQItem 
                    question="Como recebo o acesso? Preciso esperar chegar algo?" 
                    answer="O produto é 100% digital. Assim que o pagamento for confirmado (na hora para PIX e Cartão), você recebe um e-mail automático com seu login e senha. A reprodução das músicas é feita diretamente dentro da nossa plataforma online, acessível pelo celular ou computador." 
                />
            </div>
        </div>
    </section>
  );
};

export default FAQ;