import { useMemo } from "react";
export default function SelectOptions({ field, allQuotations }) {
  const options = useMemo(() => {
    return [...new Set(allQuotations.map((cotacao) => cotacao[field]))];
  }, [allQuotations, field]);
  return options.map((option, idx) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
}
