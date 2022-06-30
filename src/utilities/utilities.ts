export function priceDenominator (rawPrice : number) : string {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
    return formatter.format(rawPrice);
}