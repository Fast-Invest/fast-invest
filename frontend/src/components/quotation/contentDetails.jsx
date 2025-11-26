export default function ContentDetails({
  cotacao,
  historico_indicadores,
  dividendos,
  balanco_anual,
  balanco_trimestral,
  dre_anual,
  dre_trimestral,
  cashflow_anual,
  cashflow_trimestral
}) {
  return (
    <>
      <h1>Indicadores mais recentes</h1>
      <br />
      <div className="overflow-scroll max-w-[1000px]">
        {JSON.stringify(cotacao)}
      </div>
      <br />
      <br />
      <br />
      <h1>Indicadores nos ultimos anos</h1>
      <br />
      <textarea
        className="overflow-scroll max-w-[1000px]"
        cols={30}
        rows={10}
        value={JSON.stringify(historico_indicadores)}
        readOnly
      ></textarea>
      <br />
      <br />
      <br />
      <h1>Dividendos</h1>
      <br />
      <textarea
        className="overflow-scroll max-w-[1000px]"
        cols={30}
        rows={10}
        value={JSON.stringify(dividendos)}
        readOnly
      ></textarea>
      <br />
      <br />
      <br />
      <h1>Balanço anual</h1>
      <br />
      <textarea
        className="overflow-scroll max-w-[1000px]"
        cols={30}
        rows={10}
        value={JSON.stringify(balanco_anual)}
        readOnly
      ></textarea>
      <br />
      <br />
      <br />
      <h1>Balanço trimestral</h1>
      <br />
      <textarea
        className="overflow-scroll max-w-[1000px]"
        cols={30}
        rows={10}
        value={JSON.stringify(balanco_trimestral)}
        readOnly
      ></textarea>
      <br />
      <br />
      <br />
      <h1>Demonstrativo de resultados anual</h1>
      <br />
      <textarea
        className="overflow-scroll max-w-[1000px]"
        cols={30}
        rows={10}
        value={JSON.stringify(dre_anual)}
        readOnly
      ></textarea>
      <br />
      <br />
      <br />
      <h1>Demonstrativo de resultados trimestral</h1>
      <br />
      <textarea
        className="overflow-scroll max-w-[1000px]"
        cols={30}
        rows={10}
        value={JSON.stringify(dre_trimestral)}
        readOnly
      ></textarea>
      
      <br />
      <br />
      <br />
      <h1>Cashflow anual</h1>
      <br />
      <textarea
        className="overflow-scroll max-w-[1000px]"
        cols={30}
        rows={10}
        value={JSON.stringify(cashflow_anual)}
        readOnly
      ></textarea>
      <br />
      <br />
      <br />
      <h1>Cashflow trimestral</h1>
      <br />
      <textarea
        className="overflow-scroll max-w-[1000px]"
        cols={30}
        rows={10}
        value={JSON.stringify(cashflow_trimestral)}
        readOnly
      ></textarea>













    </>
  );
}
