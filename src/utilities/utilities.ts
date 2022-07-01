export function priceDenominator (rawPrice : number) : string {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
    return formatter.format(rawPrice);
}

export function fetchItemFromLocalStorage (key : string){
    let candidateResult = localStorage.getItem(key);
    if (candidateResult !== undefined && candidateResult !== null) {
        return JSON.parse(candidateResult)
    } else {
        return undefined
    }
}