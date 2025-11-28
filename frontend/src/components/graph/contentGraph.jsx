import { useEffect, useState } from "react";
import { TickerSearcher } from "./graphFunctions.jsx"
import quotationService from "../../services/quotationService";


export default function ContentGraph() {

    const [searchInput,setSearchInput]=useState("");
    const [searchedTicker,setSearchedTicker]=useState(null);
    const [cotacoes,setCotacoes] = useState([]);


    const updateCharts = async ()=>{
        const getSearchQuotationDetails = async () =>{
            const resposta = await quotationService.buscarDetalhesCotacaoAlltime(searchInput);
            console.log(resposta?.dados_acao)
            setSearchedTicker(resposta?.dados_acao || null);
        }
        getSearchQuotationDetails()
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



        <TickerSearcher setSearchInput={setSearchInput} searchInput={searchInput} cotacoes={cotacoes} updateCharts={updateCharts}/>
















        </main>
    );
}
