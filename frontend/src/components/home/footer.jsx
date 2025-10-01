import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row justify-between gap-8">
        {/* Logo e descrição */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-green-400">Fast Invest</h1>
          <p className="max-w-xs text-gray-400">
            Simplificando seus investimentos e levando você a novas oportunidades financeiras.
          </p>
        </div>

        {/* Links de navegação */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">Links Rápidos</h2>
          <a href="#home" className="hover:text-green-400 transition-colors">Home</a>
          <a href="#sobre" className="hover:text-green-400 transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-green-400 transition-colors">Serviços</a>
          <a href="#contato" className="hover:text-green-400 transition-colors">Contato</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">Assine nossa newsletter</h2>
          <p className="text-gray-400">Receba novidades e conteúdos exclusivos diretamente no seu email.</p>
          <form className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Seu email"
              className="px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-400 text-black font-semibold rounded-r-lg hover:bg-green-500 transition-colors"
            >
              Assinar
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Fast Invest. Todos os direitos reservados.
      </div>
    </footer>
  );
}
