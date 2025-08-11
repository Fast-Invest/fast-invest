import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LinkVoltar({ to }) {
  return (
    <Link
      to={to}
      className="absolute flex items-center justify-center top-6 right-6 w-12 h-12 border-2 border-primary rounded-full 
      text-primary hover:bg-primary hover:text-black hover:scale-110 shadow-xl shadow-primary/20 
      transition duration-300 ease-in-out transform
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Voltar ao início"
    >
      <FaArrowLeft size={20} />
    </Link>
  );
}
