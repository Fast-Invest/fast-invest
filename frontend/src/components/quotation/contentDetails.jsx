export default function ContentDetails({
  cotacao,
  historico_indicadores,
  dividendos,
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
    </>
  );
}
