export function formatNumberWithCommas(x: number | string): string {
  if (x === undefined || x === null) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
