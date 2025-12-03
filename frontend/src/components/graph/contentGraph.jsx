import { useEffect, useState } from "react";
import { TickerSearcher } from "./graphFunctions.jsx"
import quotationService from "../../services/quotationService";
import { RoicVsEvEbit, PVpaChart, GiroAtivosChart, DividaEbitdaChart, DividaPatrimonioChart, CaixaTotalChart, BalancoStackedChart, AtivosRatiosChart, RoicTimeSeries } from "./chartBuilders.jsx"

export default function ContentGraph() {

    const [searchInput1, setSearchInput1] = useState("");
    const [searchInput2, setSearchInput2] = useState("");

    const [cotacoes, setCotacoes] = useState([]);
    const [inputedSymbols1, setInputedSymbols1] = useState(null)
    const [inputedSymbols2, setInputedSymbols2] = useState(null)

    const [tickersData1, setTickersData1] = useState([])
    const [tickersData2, setTickersData2] = useState([])


    useEffect(() => {
        if (!inputedSymbols1) return;

        const getQuotationsData = async () => {
            const resposta = await quotationService.buscarDetalhesCotacaoAlltime(inputedSymbols1);
            setTickersData1(resposta.dados_acao);
        }
        getQuotationsData()
    }, [inputedSymbols1]);
    
    useEffect(() => {
        if (!inputedSymbols2) return;

        const getQuotationsData = async () => {
            const resposta = await quotationService.buscarDetalhesCotacaoAlltime(inputedSymbols2);
            setTickersData2(resposta.dados_acao);
        }
        getQuotationsData()
    }, [inputedSymbols2]);
    
    useEffect(() => {
        if (cotacoes.length > 0) return;

        const getQuotations = async () => {
            const resposta = await quotationService.buscar_cotacoes();
            setCotacoes(resposta.cotacoes);
        }
        getQuotations()
    }, [cotacoes.length]);




    return (
        <main className="p-6 text-white overflow-auto">

            {/* Assuming TickerSearcher is a component that handles the search and updates inputedSymbols */}
            <TickerSearcher 
                setSearchInput1={setSearchInput1} 
                setSearchInput2={setSearchInput2} 

                searchInput1={searchInput1} 
                searchInput2={searchInput2} 

                setInputedSymbols1={setInputedSymbols1} 
                setInputedSymbols2={setInputedSymbols2}
                cotacoes={cotacoes} 
            />

            <div className="grid grid-cols-2">
                
                <div>

                    {inputedSymbols1  &&
                        <div className="flex flex-col justify-center items-start mt-6 w-full pr-5">
                            <div className="bg-bg-card text-white font-bold p-3 rounded-2xl border border-primary/50 shadow-lg shadow-primary/30 max-h-fit self-center" >
                                {inputedSymbols1}
                            </div>
                            <div className="flex flex-col gap-8 mt-12 w-full overflow-hidden self-start ml-0">
                                <RoicVsEvEbit data={tickersData1} />
                                <DividaEbitdaChart data={tickersData1} />
                                <PVpaChart data={tickersData1} />
                                <GiroAtivosChart data={tickersData1} />
                                <DividaPatrimonioChart data={tickersData1} />
                                <CaixaTotalChart data={tickersData1} />
                                <BalancoStackedChart data={tickersData1} />
                                <RoicTimeSeries data={tickersData1} /> 
                            </div>
                        </div>


                    }
                </div>
                
                
                {inputedSymbols2 &&
                    <div className="flex flex-col justify-center items-start mt-6 w-full relative" >
                        <div className="before:block before:w-0.5 before:h-full before:bg-primary-dark before:absolute before:left-0 before:inset-y-0" />

                        <div className="bg-bg-card text-white font-bold p-3 rounded-2xl border border-primary/50 shadow-lg shadow-primary/30 max-h-fit self-center" >
                            {inputedSymbols2}
                        </div>
                        <div className="flex flex-col gap-8 mt-12 w-full overflow-hidden">
                            <RoicVsEvEbit data={tickersData2} />
                            <DividaEbitdaChart data={tickersData2} />
                            <PVpaChart data={tickersData2} />
                            <GiroAtivosChart data={tickersData2} />
                            <DividaPatrimonioChart data={tickersData2} />
                            <CaixaTotalChart data={tickersData2} />
                            <BalancoStackedChart data={tickersData2} />
                            <RoicTimeSeries data={tickersData2} /> 
                        </div>
                    </div>
                }   










            </div>



        </main>
    );
}