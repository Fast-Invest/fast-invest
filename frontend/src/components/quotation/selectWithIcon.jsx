import { FaChevronDown } from "react-icons/fa";

export default function SelectWithIcon({ children, field, setCotacoes, allQuotations, filterTipo, filterSetor, setFilter  }) 
    {

    const handleChange = (valor) => 
    {  
        setFilter(valor)

        let filtradas = allQuotations;

        const tipoAtual = field === "tipo" ? valor : filterTipo;
        const setorAtual = field === "setor" ? valor : filterSetor;

        if (tipoAtual) 
        {
            filtradas = filtradas.filter((cotacao) => cotacao.tipo === tipoAtual);
        }

        if (setorAtual) 
        {
            filtradas = filtradas.filter((cotacao) => cotacao.setor === setorAtual);
        }

        setCotacoes(filtradas);
    }


 




  return (
    <div className="relative flex-1">
      <select
        className="select-scrollbar w-full min-h-[2.75rem] font-bold pl-4 pr-10 rounded-xl outline-none border-0 cursor-pointer
        shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] transition-all duration-200
        focus:shadow-[0_0_0_2.5px_#2f303d] appearance-none bg-bg text-white"
              onChange={(e) => { handleChange(e.target.value)}}
      >
            {children}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
    </div>
  );
}