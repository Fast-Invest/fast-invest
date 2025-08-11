export default function Stepper({ etapaAtual, etapasTotais }) {
  const current = Math.max(0, etapaAtual);
  const percent = etapasTotais > 1 ? (current / (etapasTotais - 1)) * 100 : 0;

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="relative py-3">
        {/* Linha de fundo */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-4 bg-bg rounded-full" />

        {/* Linha preenchida */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-4 bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />

        {/* Bolinhas */}
        <div className="flex justify-between items-center relative z-10">
          {Array.from({ length: etapasTotais }).map((_, index) => {
            const active = index <= current;
            return (
              <div
                key={index}
                className={`flex items-center justify-center w-15 h-15 rounded-full shadow-md transition-colors duration-300 ${
                  active
                    ? "bg-primary text-neutral-900"
                    : "bg-bg text-neutral-400"
                }`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
