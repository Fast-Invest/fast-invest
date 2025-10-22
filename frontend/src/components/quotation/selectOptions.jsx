export default function SelectOptions({ field, allQuotations }) 
{
    const options = [...new Set(allQuotations.map(cotacao => cotacao[field]))]
    return options.map((option, idx) =>
    (
        <option key={idx} value={option}>{option}</option>
    )
    );
}  