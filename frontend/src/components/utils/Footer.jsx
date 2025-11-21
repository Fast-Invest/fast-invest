import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row justify-between gap-8">
        {/* Logo e descrição */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-green-400">Fast Invest</h1>
          <p className="max-w-xs text-gray-400">
            Simplificando seus investimentos e levando você a novas
            oportunidades financeiras.
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">
            Pronto para investir?
          </h2>
          <p className="text-gray-400 max-w-sm">
            Abra sua conta gratuita e comece a investir em minutos com total
            segurança.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-primary cursor-pointer text-bg font-semibold rounded-lg hover:bg-primary-dark transition-colors text-center"
          >
            Abrir conta agora
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Fast Invest. Todos os direitos reservados.
      </div>
    </footer>
  );
}
