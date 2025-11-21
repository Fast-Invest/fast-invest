import { FaSearchDollar } from "react-icons/fa";

export default function NotFoundError({ nomeCotacao }) {
  return (
    <div>
      <FaSearchDollar />
      404 Erro ao buscar informações sobre a cotação de ticker {nomeCotacao}
    </div>
  );
}
