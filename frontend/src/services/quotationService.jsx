import api from "./api.jsx"

async function buscar_cotacoes() 
{
  try 
  {
    const response = await api.get("/cotacoes");
    return {
      message: "Cotações encontradas com sucesso",
      status: response.status,
      cotacoes: response.data || [],
    };
  } 
  catch (error) 
  {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar cotacoes",
      status: error.response.status,
    };
  }
}




async function procurarDetalhesCotacao(ticker) 
{
  try 
  {
    const response = await api.get(`/cotacoes/${ticker}`);
    return {
      message: "Cotações encontradas com sucesso",
      status: response.status,
      dados_acao: response.data || null,
    };
   }
   catch (error) 
   {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar cotacoes",
      status: error.response.status,
    };
   }
}


async function buscarDetalhesCotacaoAlltime(symbol)
{
  try {

    const response = await api.get(`/cotacoes/alltime/${symbol}`);
    return {
      message: "Cotações encontradas com sucesso",
      status: response.status,
      dados_acao: response.data || null,
    };    
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar cotacoes",
      status: error.response.status,
    };    
  }
}

async function buscarDividendosCotacao(symbol)
{
  try {

    const response = await api.get(`/cotacoes/dividends/${symbol}`);
    return {
      message: "Cotações encontradas com sucesso",
      status: response.status,
      dividendos: response.data || null,
    };    
  } catch (error) {
    return {
      message: "erro ao buscar cotacoes",
      status: error.response.status,
    };    
  }
}





const quotationService={
                        procurarDetalhesCotacao,
                        buscarDividendosCotacao,
                        buscarDetalhesCotacaoAlltime,
                        buscar_cotacoes,
                      };
export default quotationService;