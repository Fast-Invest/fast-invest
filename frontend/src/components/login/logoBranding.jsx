export default function LogoBranding() {
  return (
    <div className="w-1/2 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-md text-center z-10">
        <img
          src="/svg/logo.svg"
          alt="Fast Invest"
          className="mx-auto w-400 h-100 mb-6"
        />
        <h1 className="text-5xl font-bold text-primary mb-4">Fast Invest</h1>
        <p className="text-text-muted text-lg">
          Sua plataforma moderna de investimentos e análise de mercado.
        </p>
      </div>
    </div>
  );
}
