import { FaSearchDollar } from "react-icons/fa";

export function TickerSearcher({setSearchInput,searchInput,cotacoes,updateCharts})
{

    return(
        <div className="flex justify-center flex-col">
            <h2 className="text-4xl font-bold text-text mb-8 text-center">
                Procure a <span className="text-primary">cotação</span> que deseja visualizar!
            </h2>



            <div className="justify-center flex flex-row">
                <div className="relative flex items-center max-w-max">
                    <FaSearchDollar className="absolute left-4 text-text-muted" />
                    <input
                        list="cotacoes"
                        placeholder="Ex: PETR4"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary 
                        focus:outline-none transition-colors duration-300"
                    />
                </div>

                <datalist id="cotacoes">
                    {
                    cotacoes
                    .filter(cotacao => cotacao.ticker.toLowerCase().startsWith(searchInput.toLowerCase()))
                    .slice(0,10)
                    .map((cotacao, index)=>(
                                                    <option value={cotacao.ticker} key={index}>{cotacao.nome}</option>
                                                ))
                    }

                </datalist> 

                <button 
                    onClick={()=>updateCharts()}
                    className="cursor-pointer rounded-2xl px-8 py-2 bg-primary  text-black text-lg font-bold shadow-md shadow-primary-dark/50 
                    hover:scale-105 active:scale-95 transition-all duration-300 ease-out ml-12" >
                    Pesquisar
                </button> 
            </div>
            
        </div>
    );
}