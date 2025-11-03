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




async function procurar_acao(ticker) 
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




export async function procurar_historico_balanco_anual_acao(periodo, ticker) 
{
  try {
    const response = await api.get(`/history/balance/${periodo}/${ticker}`);
    return {
      message: "Historico de balanço da ação encontrado com sucesso",
      status: response.status,
      historico: response.data || null,
    };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar historico de balanço",
      status: error.response.status,
    };
  }
}



async function procurar_historico_renda_anual_acao(periodo, ticker) 
{
  try 
  {
    const response = await api.get(`/history/income/${periodo}/${ticker}`);
    return {
      message: "Historico de renda da ação encontrado com sucesso",
      status: response.status,
      historico: response.data || null,
    };
  } 
  catch (error) 
  {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar historico de renda",
      status: error.response.status,
    };
  }
}



async function procurar_historico_fluxo_de_caixa_acao(periodo, ticker) 
{
  try 
  {
    const response = await api.get(`/history/cashflow/${periodo}/${ticker}`);
    return {
      message: "Historico de fluxo de caixa encontrado com sucesso",
      status: response.status,
      historico: response.data || null,
    };
  } 
  catch (error) 
  {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar historico de fluxo de caixa",
      status: error.response.status,
    };
  }
}


const quotationService={
                        procurar_acao,
                        buscar_cotacoes,
                        procurar_historico_balanco_anual_acao,
                        procurar_historico_renda_anual_acao,
                        procurar_historico_fluxo_de_caixa_acao
                      };
export default quotationService;