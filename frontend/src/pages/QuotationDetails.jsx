import { useParams } from "react-router-dom";
import Sidebar from "../components/utils/sideBar";
import NavBar from "../components/utils/navBar";
import Footer from "../components/utils/footer";
import ContentDetails from "../components/quotation/contentDetails";
import NotFoundError from "../components/utils/notFoundError";
import LoadingCard from "../components/utils/loadingCard";
import { useQuotationDetails } from "../hooks/useQuotationDetails";


export default function QuotationDetails() {
  const { ticker } = useParams();
  const { loading,error,data } = useQuotationDetails(ticker)
  console.log(error)
 
  
  if (loading && !data?.mostRecentIndicators) {
    return (
      <>
        <div className="flex bg-bg min-h-screen text-text">
          <div className="border-r border-white/10">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1">
            <NavBar />
            <LoadingCard nomeCotacao={ticker} />
            <Footer />
          </div>
        </div>
      </>
    );
  }

  if (error) {
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




  return (
      <>
        <div className="flex bg-bg min-h-screen text-text">
          <div className="border-r border-white/10">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1">
            <NavBar />
            <ContentDetails
              cotacao={data?.mostRecentIndicators}
              historico_indicadores={data?.allTimeIndicators}
              dividendos={data?.dividendos}
              balanco_anual={data?.balancoAnual}
              balanco_trimestral={data?.balancoTrimestral}
              dre_anual={data?.dreAnual}
              dre_trimestral={data?.dreTrimestral}
              cashflow_anual={data?.cashflowAnual}
              cashflow_trimestral={data?.cashflowTrimestral}
            />
            <Footer />
          </div>
        </div>
      </>
    );
} 



  

