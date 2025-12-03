import React from "react";

export default function ContentAbout() {
  return (
    <div className="min-h-screen w-full text-white flex flex-col items-center py-20 px-6">
      {/* Header */}
      <div className="max-w-4xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Sobre o Projeto
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Uma plataforma moderna criada para oferecer análises financeiras
          completas, indicadores avançados e histórico detalhado de empresas
          listadas na bolsa.
        </p>
      </div>

      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border border-gray-700 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 text-primary">Missão</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Tornar dados financeiros complexos acessíveis e visuais, ajudando
            investidores a tomarem decisões mais inteligentes e fundamentadas
            através de uma interface clara, moderna e intuitiva.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 text-primary">
            Tecnologia
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Construído com React, Tailwind, APIs financeiras e foco em
            performance. Cada página é otimizada para entregar dados atualizados
            de maneira rápida e responsiva.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 text-primary">
            Transparência
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Todas as informações são sempre apresentadas com clareza, com
            contextualização e histórico para manter o investidor no controle.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 text-primary">
            Evolução Contínua
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            O projeto está sempre recebendo melhorias, novos indicadores, novos
            gráficos e funcionalidades relevantes para análise profissional.
          </p>
        </div>
      </div>

      <div className="max-w-4xl text-center mt-20 opacity-70 text-sm text-gray-400">
        © {new Date().getFullYear()} - Plataforma de Análises Financeiras
      </div>
    </div>
  );
}
