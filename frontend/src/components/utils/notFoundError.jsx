import { FaSearchDollar } from "react-icons/fa";

export default function NotFoundError({ nomeCotacao }) {
  return (
    <div className="flex justify-center items-center p-40">

        <div className="flex justify-center flex-col items-center rounded-xl border-2 border-primary-dark p-12 shadow-lg shadow-primary/30 gap-4">
            
            <div className="w-full justify-center flex flex-row">
              <FaSearchDollar size={50} /><span className="text-[#f8f8ff] text-5xl font-extrabold ml-8">404 NÃO ENCONTRADO</span>
            </div>

            <div>
              <p className=" text-primary-dark font-bold text-3xl">Erro ao buscar informações sobre a cotação  { `de ticker ${nomeCotacao}` || ""} </p>
            </div>  
            <div>
              <p className=" text-primary-dark font-bold text-3xl">Ação inexistente, servidor fora do ar ou erro ao buscar detalhes da ação</p>
            </div>
            
        </div>

    </div>
  );
}
