import api from "./api"

export async function procurar_historico_balanco(periodo, ticker) 
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



async function procurar_demonstrativo_resultados(periodo, ticker) 
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



async function procurar_fluxo_de_caixa(periodo, ticker) 
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
const historyService = {procurar_historico_balanco,procurar_fluxo_de_caixa,procurar_demonstrativo_resultados}
export default historyService;