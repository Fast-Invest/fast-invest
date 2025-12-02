import { useEffect, useState } from "react";
import { TickerSearcher } from "./graphFunctions.jsx"
import quotationService from "../../services/quotationService";


export default function ContentGraph() {

    const [searchInput,setSearchInput]=useState("");
    const [cotacoes,setCotacoes] = useState([]);
    const [inputedSymbols,setInputedSymbols]=useState([])
    const [tickersData,setTickersData]=useState([])

    const updateCharts = async (symbols)=>{
        const fetchQuotationData = async (ticker)=>{
            const resposta = await quotationService.procurarDetalhesCotacao(ticker);
            setTickersData(prev => [...prev, resposta?.dados_acao])
        }
        for(const symbol of symbols)
        {
            fetchQuotationData(symbol)
        }
    }

    useEffect(() => {
        if (cotacoes.length > 0) return;

        const getQuotations = async () =>{
            const resposta = await quotationService.buscar_cotacoes();
            setCotacoes(resposta.cotacoes);
        }
        getQuotations()
    }, [cotacoes.length]);



    return(
        <main className="p-6 text-white overflow-auto">



        <TickerSearcher setSearchInput={setSearchInput} searchInput={searchInput} setInputedSymbols={setInputedSymbols} cotacoes={cotacoes} updateCharts={updateCharts}/>

        <div className="flex flex-row items-center gap-3 justify-center mt-6">
            {inputedSymbols.map((symbol,index)=>(

                <div className="bg-bg-card text-white font-bold p-3 rounded-2xl border border-primary/50 shadow-lg shadow-primary/30" key={index}>
                    {symbol}
                </div>
            ))}

        </div>


       











        </main>
    );
}
