import type { ISoldItem } from "./types";

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

export function compareFunctionGenerator (isDate : boolean, isAscending : boolean) {
    const keyOfComparedValue = (isDate ? "milisecondsCreated" : "price") as keyof ISoldItem
    const compareFunction = (soldItem1 : ISoldItem, soldItem2 : ISoldItem) => {
        const [comparedValue1, comparedValue2] = [soldItem1[keyOfComparedValue], soldItem2[keyOfComparedValue]];
        if (comparedValue1 < comparedValue2) {
            return -1;
        }
    
        if (comparedValue1 > comparedValue2) {
            return 1; 
        }
          // a must be equal to b
          return 0;
    }

    const alternateCompareFunction = (soldItem1 : ISoldItem, soldItem2 : ISoldItem) => {
        return -1 * compareFunction(soldItem1, soldItem2);
    }

    return isAscending ? compareFunction : alternateCompareFunction;
}
