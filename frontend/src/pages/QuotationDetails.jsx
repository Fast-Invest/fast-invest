import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/utils/sideBar";
import NavBar from "../components/utils/navBar";
import Footer from "../components/utils/footer";
import ContentDetails from "../components/quotation/contentDetails";
import NotFoundError from "../components/utils/NotFoundError";
import quotationService from "../services/quotationService";

export default function QuotationDetails() {
  const { ticker } = useParams();
  const [mostRecentData, setMostRecentData] = useState(null);
  const [historicData, setHistoricData] = useState(null);
  const [dividendosPagos, setDividendosPagos] = useState(null);

  useEffect(() => {
    async function getData(ticker) {
      try {
        const resp = await quotationService.procurarDetalhesCotacao(ticker);
        setMostRecentData(resp?.dados_acao || null);
      } catch (error) {
        console.log("erro: ", error);
        setMostRecentData(null);
      }

      try {
        const resp = await quotationService.buscarDetalhesCotacaoAlltime(
          ticker
        );
        setHistoricData(resp?.dados_acao || null);
      } catch (error) {
        console.log("erro: ", error);
        setHistoricData(null);
      }

      try {
        const resp = await quotationService.buscarDividendosCotacao(ticker);
        setDividendosPagos(resp?.dividendos || null);
      } catch (error) {
        console.log("erro: ", error);
        setDividendosPagos(null);
      }
    }

    if (ticker) getData(ticker);
  }, [ticker]);

  if (mostRecentData) {
    return (
      <>
        <div className="flex bg-bg min-h-screen text-text">
          <div className="border-r border-white/10">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1">
            <NavBar />
            <ContentDetails
              cotacao={mostRecentData}
              historico_indicadores={historicData}
              dividendos={dividendosPagos}
            />
            <Footer />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex bg-bg min-h-screen text-text">
          <div className="border-r border-white/10">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1">
            <NavBar />
            <NotFoundError nomeCotacao={ticker} />
            <Footer />
          </div>
        </div>
      </>
    );
  }
}
