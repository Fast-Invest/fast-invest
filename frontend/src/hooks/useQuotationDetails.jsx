import { useEffect, useState } from "react";
import quotationService from "../services/quotationService";
import historyService from "../services/historyService";

export function useQuotationDetails(ticker) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!ticker) {
      setState({ loading: false, error: true, data: null });
      return;
    }
    setState({ loading: true, error: null, data: null });
    getData(ticker, setState);
  }, [ticker]);

  return state;
}

async function getData(ticker, setState) {
  try {
    const [
      mostRecentIndicators,
      allTimeIndicators,
      perfilCotacao,
      dividendosPagos,
      balancoAnual,
      balancoTrimestral,
      DREAnual,
      DRETrimestral,
      cashflowAnual,
      cashflowTrimestral,
    ] = await Promise.all([
      quotationService.procurarDetalhesCotacao(ticker),
      quotationService.buscarDetalhesCotacaoAlltime(ticker),
      quotationService.procurarDadosPerfilCotacao(ticker),
      quotationService.buscarDividendosCotacao(ticker),
      historyService.procurar_historico_balanco("anual", ticker),
      historyService.procurar_historico_balanco("trimestral", ticker),
      historyService.procurar_demonstrativo_resultados("anual", ticker),
      historyService.procurar_demonstrativo_resultados("trimestral", ticker),
      historyService.procurar_fluxo_de_caixa("anual", ticker),
      historyService.procurar_fluxo_de_caixa("trimestral", ticker),
    ]);

    if (!mostRecentIndicators?.dados_acao) {
      throw new Error("Cotação não encontrada");
    }
    console.log("teste", perfilCotacao?.profile);
    setState({
      loading: false,
      error: null,
      data: {
        mostRecentIndicators: mostRecentIndicators?.dados_acao || null,
        allTimeIndicators: allTimeIndicators.dados_acao || null,
        perfilCotacao: perfilCotacao?.profile || null,
        dividendos: dividendosPagos?.dividendos || null,
        balancoAnual: balancoAnual?.historico || null,
        balancoTrimestral: balancoTrimestral?.historico || null,
        cashflowAnual: cashflowAnual?.historico || null,
        cashflowTrimestral: cashflowTrimestral?.historico || null,
        dreAnual: DREAnual?.historico || null,
        dreTrimestral: DRETrimestral?.historico || null,
      },
    });
  } catch (error) {
    console.log("caiu aki:", error);
    setState({ loading: false, error: true, data: null });
  }
}
