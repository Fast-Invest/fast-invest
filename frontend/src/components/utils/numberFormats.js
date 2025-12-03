export function formatLargeNumber(num) {
  if (num === null || num === undefined || Number.isNaN(num)) {
    return "N/A";
  }
  if (num >= 1e12) {
    return `R$ ${(num / 1e12).toFixed(2).replace(".", ",")}T`;
  }
  if (num >= 1e9) {
    return `R$ ${(num / 1e9).toFixed(2).replace(".", ",")}B`;
  }
  if (num >= 1e6) {
    return `R$ ${(num / 1e6).toFixed(2).replace(".", ",")}M`;
  }
  return `R$ ${num.toFixed(2).replace(".", ",")}`;
}

export function formatNumber(value, decimals = 2, placeholder = "N/A") {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return placeholder;
  }
  return Number(value).toFixed(decimals).replace(".", ",");
}
