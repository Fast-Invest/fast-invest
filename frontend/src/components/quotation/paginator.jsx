import {FaAngleDoubleLeft,
        FaAngleLeft,
        FaAngleRight,
        FaAngleDoubleRight, 
        FaChevronDown} 
from "react-icons/fa";


export default function Paginator()
{

    function SelectPage({children})
    {
        return(
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




return(    
<div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-sm text-white/70 w-full">
    <div className="flex items-center gap-2 w-full md:w-auto">
        <span>Mostrar:</span>
        <SelectPage className="flex-1 md:w-40">
            <option>10 por página</option>
            <option>20 por página</option>
            <option>50 por página</option>
            <option>100 por página</option>
        </SelectPage>
    </div>

    <div className="flex items-center gap-2 flex-wrap justify-center">

        <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] focus:shadow-[0_0_0_2.5px_#2f303d]">
            <FaAngleDoubleLeft size={18} />
        </button>

        <button className="min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] focus:shadow-[0_0_0_2.5px_#2f303d]">
            <FaAngleLeft size={18} /> Anterior
        </button>

        <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl bg-[#00ff9c] text-black shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            1
        </button>

        <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            2
        </button>

        <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            3
        </button>

        <button className="min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            Próximo <FaAngleRight size={18} />
        </button>

        <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            <FaAngleDoubleRight size={18} />
        </button>

    </div>

    <div className="text-center md:text-right w-full md:w-auto">
        Página 1 de 10
    </div>
    </div>);
}